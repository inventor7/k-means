<template>
  <div class="mb-6 w-full bg-gray-100 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">
      {{ t("kmeans.howItWorksTitle") }}
    </h3>
    <ol class="list-decimal pl-6 space-y-1">
      <li>{{ t("kmeans.step1") }}</li>
      <li>{{ t("kmeans.step2") }}</li>
      <li>{{ t("kmeans.step3") }}</li>
      <li>{{ t("kmeans.step4") }}</li>
    </ol>
  </div>

  <div class="border border-gray-300 rounded-lg mb-4 overflow-hidden">
    <canvas
      ref="canvasRef"
      width="600"
      height="400"
      class="bg-white"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleCanvasMouseMove"
      @mouseup="handleCanvasMouseUp"
    />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="font-semibold mb-3">{{ t("kmeans.datasetConfig") }}</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.numPoints") }}:</label
          >
          <input
            type="range"
            min="20"
            max="300"
            v-model.number="numPoints"
            class="w-full"
            :disabled="running"
          />
          <div class="text-center text-sm">{{ numPoints }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.numClusters") }} (K):</label
          >
          <input
            type="range"
            min="2"
            max="7"
            v-model.number="k"
            class="w-full"
            :disabled="running"
          />
          <div class="text-center text-sm">{{ k }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.datasetType") }}:</label
          >
          <select
            v-model="datasetType"
            class="w-full p-2 border rounded"
            :disabled="running"
          >
            <option value="blobs">{{ t("kmeans.blobs") }}</option>
            <option value="uniform">{{ t("kmeans.uniform") }}</option>
            <option value="circles">
              {{ t("kmeans.concentricCircles") }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.distribution") }}:</label
          >
          <select
            v-model="distribution"
            class="w-full p-2 border rounded"
            :disabled="running || datasetType !== 'blobs'"
          >
            <option value="random">{{ t("kmeans.random") }}</option>
            <option value="gaussian">{{ t("kmeans.gaussian") }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="font-semibold mb-3">
        {{ t("kmeans.algorithmSettings") }}
      </h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.animationSpeed") }} (ms):</label
          >
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            v-model.number="speed"
            class="w-full"
            :disabled="running"
          />
          <div class="text-center text-sm">{{ speed }}ms</div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t("kmeans.maxIterations") }}:</label
          >
          <input
            type="range"
            min="5"
            max="50"
            v-model.number="maxIterations"
            class="w-full"
            :disabled="running"
          />
          <div class="text-center text-sm">{{ maxIterations }}</div>
        </div>

        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="isManualMode"
            :disabled="running"
            class="rounded"
          />
          <label class="text-sm font-medium">
            {{ t("kmeans.manualMode") }}</label
          >
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-4 mb-6">
    <button
      @click="initializeSimulation"
      :disabled="running"
      class="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
    >
      {{ t("kmeans.initialize") }}
    </button>
    <button
      v-if="isManualMode"
      @click="stepSimulation"
      :disabled="running || points.length === 0 || convergence"
      class="px-4 py-2 bg-yellow-500 text-white rounded disabled:bg-gray-300"
    >
      {{ t("kmeans.step") }}
    </button>
    <button
      v-else
      @click="toggleRunning"
      :disabled="points.length === 0 || convergence"
      class="px-4 py-2 text-white rounded"
      :class="{
        'bg-red-500': running,
        'bg-blue-500': !running,
        'disabled:bg-gray-300': running || points.length === 0 || convergence,
      }"
    >
      {{ running ? t("kmeans.pause") : t("kmeans.run") }}
    </button>
    <button
      @click="resetSimulation"
      class="px-4 py-2 bg-gray-500 text-white rounded"
    >
      {{ t("kmeans.reset") }}
    </button>
  </div>

  <div class="w-full bg-white p-4 rounded-lg shadow">
    <h3 class="font-semibold mb-2">{{ t("kmeans.status") }}:</h3>
    <p class="text-gray-700">{{ explanation }}</p>
    <div class="mt-2 flex justify-between text-sm">
      <span>
        {{ t("kmeans.iterations") }}: {{ iterations }} /
        {{ maxIterations }}</span
      >
      <span>{{
        convergence ? t("kmeans.converged") : t("kmeans.running")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

// Canvas ref
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasWidth = 600;
const canvasHeight = 400;

// Local state
const numPoints = ref(100);
const k = ref(3);
const maxIterations = ref(10);
const points = ref<Array<{ x: number; y: number }>>([]);
const centroids = ref<Array<{ x: number; y: number; isDraggable: boolean }>>(
  []
);
const assignments = ref<number[]>([]);
const iterations = ref(0);
const running = ref(false);
const convergence = ref(false);
const speed = ref(500);
const step = ref(0);
const isManualMode = ref(false);
const explanation = ref(t("kmeans.initialExplanation"));
const datasetType = ref("blobs");
const distribution = ref("gaussian");

// Animation timer
let animationTimer: number | undefined;

// Enhanced color palette with better contrast
const colors = [
  "#FF4136", // Red
  "#0074D9", // Blue
  "#2ECC40", // Green
  "#FFDC00", // Yellow
  "#B10DC9", // Purple
  "#FF851B", // Orange
  "#39CCCC", // Teal
  "#F012BE", // Magenta
  "#85144b", // Maroon
  "#01FF70", // Lime
];

// Generate points based on dataset type
const generatePoints = () => {
  const newPoints = [];

  if (datasetType.value === "blobs") {
    const pointsPerCluster = Math.floor(numPoints.value / k.value);
    for (let c = 0; c < k.value; c++) {
      const centerX = Math.random() * (canvasWidth - 100) + 50;
      const centerY = Math.random() * (canvasHeight - 100) + 50;
      const spread = Math.random() * 40 + 30;

      for (let i = 0; i < pointsPerCluster; i++) {
        if (distribution.value === "gaussian") {
          const u1 = Math.random();
          const u2 = Math.random();
          const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

          newPoints.push({
            x: centerX + z1 * (spread / 2),
            y: centerY + z2 * (spread / 2),
          });
        } else {
          newPoints.push({
            x: centerX + (Math.random() - 0.5) * spread * 2,
            y: centerY + (Math.random() - 0.5) * spread * 2,
          });
        }
      }
    }
  } else if (datasetType.value === "uniform") {
    for (let i = 0; i < numPoints.value; i++) {
      newPoints.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
      });
    }
  } else if (datasetType.value === "circles") {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const pointsPerCircle = Math.floor(numPoints.value / k.value);

    for (let c = 0; c < k.value; c++) {
      const radius = 50 + c * 50;
      for (let i = 0; i < pointsPerCircle; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const jitter = (Math.random() - 0.5) * 20;
        newPoints.push({
          x: centerX + Math.cos(angle) * (radius + jitter),
          y: centerY + Math.sin(angle) * (radius + jitter),
        });
      }
    }
  }

  // Ensure points stay within canvas bounds
  return newPoints.map((point) => ({
    x: Math.max(10, Math.min(canvasWidth - 10, point.x)),
    y: Math.max(10, Math.min(canvasHeight - 10, point.y)),
  }));
};

// Calculate Euclidean distance between two points
const distance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// Assign each point to the nearest centroid
const assignPointsToClusters = (
  pts: Array<{ x: number; y: number }>,
  cents: Array<{ x: number; y: number }>
) => {
  return pts.map((point) => {
    const distances = cents.map((centroid) => distance(point, centroid));
    return distances.indexOf(Math.min(...distances));
  });
};

// Update centroids based on mean of assigned points
const updateCentroids = (
  pts: Array<{ x: number; y: number }>,
  assigns: number[],
  clusterCount: number
) => {
  const newCentroids = [];
  let hasChanged = false;

  for (let i = 0; i < clusterCount; i++) {
    const assignedPoints = pts.filter((_, index) => assigns[index] === i);

    if (assignedPoints.length > 0) {
      const sumX = assignedPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = assignedPoints.reduce((sum, p) => sum + p.y, 0);
      const newX = sumX / assignedPoints.length;
      const newY = sumY / assignedPoints.length;

      const oldCentroid = centroids.value[i];
      if (
        oldCentroid &&
        (Math.abs(oldCentroid.x - newX) > 0.1 ||
          Math.abs(oldCentroid.y - newY) > 0.1)
      ) {
        hasChanged = true;
      }

      newCentroids.push({ x: newX, y: newY });
    } else {
      newCentroids.push(
        centroids.value[i]
          ? { ...centroids.value[i] }
          : { x: Math.random() * canvasWidth, y: Math.random() * canvasHeight }
      );
    }
  }

  return { newCentroids, hasChanged };
};

// Step through one iteration of k-means
const stepSimulation = () => {
  if (points.value.length === 0 || centroids.value.length === 0) return;

  if (iterations.value >= maxIterations.value || convergence.value) {
    running.value = false;
    step.value = 3;
    explanation.value = t("kmeans.converged");
    return;
  }

  const newAssignments = assignPointsToClusters(points.value, centroids.value);
  assignments.value = newAssignments;

  const { newCentroids, hasChanged } = updateCentroids(
    points.value,
    newAssignments,
    k.value
  );
  (newCentroids as any).forEach(
    (
      centroid: { x: number; y: number; isDraggable?: boolean },
      index: number
    ) => {
      centroid.isDraggable = true;
    }
  );
  centroids.value = newCentroids as any;
  convergence.value = !hasChanged;
  iterations.value++;
  explanation.value = t("kmeans.iterationUpdate", {
    iteration: iterations.value,
  });
};

// Canvas event handler
const handleCanvasEvent = (e: MouseEvent) => {
  if (running.value) return;

  const rect = canvasRef.value?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  points.value = [...points.value, { x, y }];
  drawCanvas();
};

let isDrawing = false;
let isDraggingCentroid = false;
let draggedCentroidIndex = -1;
const startDrawing = (e: MouseEvent) => {
  isDrawing = true;
  handleCanvasEvent(e);
};

const handleCanvasMouseDown = (e: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Check if clicked on a centroid
  for (let i = 0; i < centroids.value.length; i++) {
    const centroid = centroids.value[i];
    if (centroid.isDraggable) {
      const distance = Math.sqrt(
        Math.pow(x - centroid.x, 2) + Math.pow(y - centroid.y, 2)
      );
      if (distance <= 10) {
        startDragCentroid(e, i);
        return;
      }
    }
  }

  startDrawing(e);
};

const startDragCentroid = (e: MouseEvent, index: number) => {
  isDraggingCentroid = true;
  draggedCentroidIndex = index;
};

const dragCentroid = (e: MouseEvent) => {
  if (!isDraggingCentroid) return;
  const rect = canvasRef.value?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  centroids.value[draggedCentroidIndex].x = x;
  centroids.value[draggedCentroidIndex].y = y;
  drawCanvas();
};

const drawPoints = (e: MouseEvent) => {
  if (!isDrawing) return;
  handleCanvasEvent(e);
};

const stopDragCentroid = () => {
  isDraggingCentroid = false;
  draggedCentroidIndex = -1;
};

const handleCanvasMouseMove = (e: MouseEvent) => {
  drawPoints(e);
  dragCentroid(e);
};

const handleCanvasMouseUp = () => {
  stopDrawing();
  stopDragCentroid();
};

const stopDrawing = () => {
  isDrawing = false;
};

// Draw the canvas
const drawCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw points with subtle shadow
  points.value.forEach((point, index) => {
    ctx.beginPath();
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 3;
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);

    if (assignments.value.length > 0) {
      ctx.fillStyle = colors[assignments.value[index] % colors.length];
    } else {
      ctx.fillStyle = "#aaaaaa";
    }

    ctx.fill();
  });

  // Draw lines from points to centroids
  if (assignments.value.length > 0) {
    points.value.forEach((point, index) => {
      const centroidIndex = assignments.value[index] % colors.length;
      const centroid = centroids.value[centroidIndex];

      if (centroid) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(centroid.x, centroid.y);
        ctx.strokeStyle = colors[centroidIndex];
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }

  // Draw centroids with distinctive style
  centroids.value.forEach((centroid, index) => {
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 5;

    // Outer ring
    ctx.beginPath();
    ctx.arc(centroid.x, centroid.y, 10, 0, Math.PI * 2);
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner fill
    ctx.beginPath();
    ctx.arc(centroid.x, centroid.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(centroid.x, centroid.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
  });
};

// Initialize simulation
const initializeSimulation = () => {
  const newPoints = generatePoints();
  points.value = newPoints;

  // Choose k random points as initial centroids
  const shuffled = [...newPoints].sort(() => Math.random() - 0.5);
  const newCentroids = shuffled
    .slice(0, k.value)
    .map((p) => ({ ...p, isDraggable: true }));

  centroids.value = newCentroids as any;
  assignments.value = [];
  iterations.value = 0;
  convergence.value = false;
  step.value = 1;
  explanation.value = t("kmeans.initialized");

  drawCanvas();
};

// Toggle running state
const toggleRunning = () => {
  running.value = !running.value;

  if (running.value) {
    runAnimation();
  } else {
    clearTimeout(animationTimer);
  }
};

// Run animation
const runAnimation = () => {
  if (
    !running.value ||
    convergence.value ||
    iterations.value >= maxIterations.value
  ) {
    running.value = false;
    return;
  }

  stepSimulation();
  drawCanvas();

  animationTimer = window.setTimeout(runAnimation, speed.value);
};

// Reset simulation
const resetSimulation = () => {
  points.value = [];
  centroids.value = [];
  assignments.value = [];
  iterations.value = 0;
  convergence.value = false;
  running.value = false;
  step.value = 0;
  explanation.value = t("kmeans.initialExplanation");

  clearTimeout(animationTimer);
  drawCanvas();
};

onMounted(() => {
  drawCanvas();
});
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    aria-label="Fields filled progress"
    aria-valuenow="25"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress-bar" :style="progressStyles"></div>
  </div>
</template>

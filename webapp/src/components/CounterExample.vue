<template>
  <div class="counter-example">
    <h2>Pinia Counter Example</h2>
    
    <div class="counter-display">
      <p>Count: <strong>{{ counter.count }}</strong></p>
      <p>Double Count: <strong>{{ counter.doubleCount }}</strong></p>
    </div>

    <div class="button-group">
      <button @click="counter.increment" class="btn btn-success">+</button>
      <button @click="counter.decrement" class="btn btn-danger">-</button>
      <button @click="counter.reset" class="btn btn-secondary">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore()
</script>

<style scoped>
.counter-example {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-soft);
}

h2 {
  margin-top: 0;
  color: var(--color-heading);
}

.counter-display {
  margin: 20px 0;
  padding: 15px;
  background-color: var(--color-background);
  border-radius: 4px;
  border-left: 4px solid hsla(160, 100%, 37%, 1);
}

.counter-display p {
  margin: 10px 0;
  font-size: 18px;
  color: var(--color-text);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-success {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.btn-success:hover {
  background-color: hsla(160, 100%, 37%, 0.8);
}

.btn-danger {
  background-color: hsla(160, 100%, 37%, 0.7);
  color: white;
}

.btn-danger:hover {
  background-color: hsla(160, 100%, 37%, 0.6);
}

.btn-secondary {
  background-color: var(--color-border-hover);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-border);
}
</style>

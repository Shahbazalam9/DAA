
function drawArray(arr) {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    arr.forEach(value => {
      const bar = document.createElement('div');
      bar.className = 'array-bar';
      bar.style.height = `${value * 4}px`;
      arrayContainer.appendChild(bar);
    });
  }

  async function bubbleSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await sleep(50);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          drawArray(arr);
        }
      }
    }
  }

  async function selectionSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      await sleep(50);
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      drawArray(arr);
    }
  }

  async function insertionSort(arr) {
    const len = arr.length;

    for (let i = 1; i < len; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        await sleep(50);
        arr[j + 1] = arr[j];
        j = j - 1;
        drawArray(arr);
      }

      arr[j + 1] = key;
      drawArray(arr);
    }
  }

  async function mergeSort(arr, start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);

      await mergeSort(arr, start, mid);
      await mergeSort(arr, mid + 1, end);

      await merge(arr, start, mid, end);
    }
  }

  async function merge(arr, start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }

    while (i < left.length) {
      arr[k++] = left[i++];
    }

    while (j < right.length) {
      arr[k++] = right[j++];
    }

    await sleep(50);
    drawArray(arr.slice(start, end + 1));
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);

      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high)
      ]);
    }
  }

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        await sleep(50);
        drawArray(arr);
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    await sleep(50);
    drawArray(arr);

    return i + 1;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getWorstAverageBestComplexity(algorithm) {
    switch (algorithm) {
      case 'bubble':
        return {
          worst: 'O(n^2)',
          average: 'O(n^2)',
          best: 'O(n)',
        };
      case 'selection':
        return {
          worst: 'O(n^2)',
          average: 'O(n^2)',
          best: 'O(n^2)',
        };
      case 'insertion':
        return {
          worst: 'O(n^2)',
          average: 'O(n^2)',
          best: 'O(n)',
        };
      case 'merge':
        return {
          worst: 'O(n log n)',
          average: 'O(n log n)',
          best: 'O(n log n)',
        };
      case 'quick':
        return {
          worst: 'O(n^2)',
          average: 'O(n log n)',
          best: 'O(n log n)',
        };
      default:
        console.error('Invalid algorithm');
        return {};
    }
  }

  function displayOutput(arr) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.textContent = 'Sorted Output: [' + arr.join(', ') + ']';
  }

  function displayTimeComplexity(algorithm, runningTime) {
    const complexities = getWorstAverageBestComplexity(algorithm);
    const timeComplexityContainer = document.getElementById('time-complexity');
    timeComplexityContainer.textContent = `
      Worst Case: ${complexities.worst}
      Average Case: ${complexities.average}
      Best Case: ${complexities.best}
      Running Time: ${runningTime.toFixed(2)} milliseconds
    `;
  }

  async function sort(algorithm) {
    const inputArray = document.getElementById('inputArray').value;
    const array = inputArray.split(',').map(Number);

    if (!array.every(Number.isInteger)) {
      alert('Please enter a valid array of integers.');
      return;
    }

    drawArray(array);

    const startTime = performance.now();

    switch (algorithm) {
      case 'bubble':
        await bubbleSort(array);
        break;
      case 'selection':
        await selectionSort(array);
        break;
      case 'insertion':
        await insertionSort(array);
        break;
      case 'merge':
        await mergeSort(array, 0, array.length - 1);
        break;
      case 'quick':
        await quickSort(array, 0, array.length - 1);
        break;
      default:
        console.error('Invalid algorithm');
        return;
    }

    const endTime = performance.now();
    const runningTime = endTime - startTime;

    displayOutput(array);
    displayTimeComplexity(algorithm, runningTime);
  }

const canvas = (() => {
  const canvas = document.getElementById('checkers-game')
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width = 600;
  const canvasHeight = canvas.height = 600;
  return {
    ctx,
    canvas,
    canvasWidth,
    canvasHeight
  }
})();
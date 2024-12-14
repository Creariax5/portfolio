// Keyboard controls setup
if (!window.keys) {
  window.keys = {};
  
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });
}
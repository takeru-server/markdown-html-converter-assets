document.body.innerHTML = (function escapeHtml(unsafe) {
  return unsafe
         .replace(/&/g, '&')
         .replace(/</g, '<')
         .replace(/>/g, '>')
         .replace(/"/g, '"')
         .replace(/'/g, ''');
})(document.body.innerHTML);
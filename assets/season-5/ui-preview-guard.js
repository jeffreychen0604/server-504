/* Local design review only: block real feedback, GitHub issue creation and Turnstile. */
window.SERVER504_CONFIG = { feedbackApi: 'preview-only', turnstileSiteKey: '' };
document.addEventListener('submit', event => {
  if (event.target.id !== 'contributeForm') return;
  event.preventDefault(); event.stopImmediatePropagation();
  const status = document.getElementById('feedbackStatus');
  status.hidden = false;
  status.textContent = document.documentElement.lang === 'vi' ? 'Đã xem trước hoàn tất. Bản thiết kế không gửi dữ liệu tới quản trị viên.' : 'Preview complete. This design does not send feedback.';
}, true);

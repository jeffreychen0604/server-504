# Sửa bố cục KE

Vấn đề: bốn cột legacy đặt VS theo mép ô tên đối thủ, còn đường chia nền theo giữa card; server / CP tách rời phe đối thủ. Layout rộng và hẹp dùng nhiều rule cạnh tranh nên kiểm tra tràn ngang không phát hiện được lệch trục này.

Thay đổi: gỡ 55 rule KE cũ khỏi baseline, dùng một block component với hai vùng phe bằng nhau và vùng đệm giữa. VS và đường chia nền dùng chung biến `--ke-split`. Server / CP nằm phía đối thủ; màn hẹp xếp metadata dọc, tên dài xuống dòng. Giữ table / dữ liệu / cờ và bão cát hiện có.

| Viewport | Panel | Sai lệch VS với trục giữa | CP / tên / nhóm metadata |
| --- | ---: | ---: | --- |
| 320×568 | 292 | 0.000 px | Đạt |
| 375×667 | 347 | 0.000 px | Đạt |
| 390×844 | 362 | 0.000 px | Đạt |
| 768×1024 | 416 | 0.000 px | Đạt |
| 1024×768 | 647 | 0.000 px | Đạt |
| 1280×900 | 532 | 0.008 px | Đạt |
| 1440×1080 | 621 | 0.008 px | Đạt |
| 1920×1080 | 831 | 0.000 px | Đạt |

- 6 locale EN / FR / ES / PT / KO / VI tại 1440 và 390 px: không tràn, CP và tên không cắt. Các tên dài có chữ Hàn hiển thị đầy đủ.
- Trên 320 px, thử placeholder Unknown và CP `999,999,999,999` bằng DOM trong tab test, sau đó khôi phục: không tràn / cắt. Không ghi dữ liệu giả vào repository.
- Đã xem desktop / mobile, có bật bão cát. 8 cờ KE nằm trong card, bảng liên minh bên cạnh vẫn đủ CP. Console không có warning / error trong phiên test.
- Entrypoint validator và kiểm diff đạt; tăng version URL cho hai stylesheet để trình duyệt lấy bản sửa. Preview dùng chung CSS mới.

Đây là kiểm tra bố cục component, không phải audit contrast hay benchmark thiết bị thật. Không đổi dữ liệu đối thủ hoặc giảm cường độ bão cát.

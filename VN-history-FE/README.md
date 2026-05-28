# VNHistory - Cổng Thông Tin Lịch Sử Việt Nam (Phân Hệ Frontend)

**VNHistory** là một nền tảng web tương tác trực quan được thiết kế nhằm mục đích tái hiện và tôn vinh dòng chảy lịch sử hào hùng của dân tộc Việt Nam qua các triều đại. Dự án cung cấp cho học sinh, sinh viên và những người yêu thích lịch sử một không gian số hóa sinh động, chính xác để tra cứu, tìm hiểu các triều đại, nhân vật lịch sử, dòng thời gian sự kiện, di sản văn hóa và phim tư liệu lịch sử.

---

## 🌟 Tính Năng Nổi Bật

### 1. Phân Hệ Người Dùng (Public Client Interface)
*   **Trang Chủ Ấn Tượng:** Banner mang âm hưởng sử thi Việt Nam, trưng bày dòng sự kiện lịch sử nổi bật, danh sách triều đại nổi bật và các phim tư liệu mới nhất.
*   **Khám Phá Triều Đại (`/kham-pha`):** Tìm hiểu chi tiết từng triều đại lịch sử nước nhà từ thời các Vua Hùng dựng nước đến nhà Nguyễn cuối cùng.
*   **Nhân Vật Lịch Sử (`/nhan-vat`):** Kho dữ liệu về tiểu sử, công tích, giai thoại của các danh nhân, anh hùng dân tộc.
*   **Dòng Thời Gian Lịch Sử (`/dong-thoi-gian`):** Sắp xếp chuỗi sự kiện lịch sử theo trình tự năm tháng giúp người đọc nắm bắt cốt mốc lịch sử dễ dàng.
*   **Văn Hóa & Di Sản (`/van-hoa`):** Trình bày các phong tục tập quán cổ xưa, các di sản văn hóa vật thể/phi vật thể đặc sắc.
*   **Thư Viện Phim Tư Liệu (`/video`):**
    *   Hỗ trợ **phát thử video 15 giây (tự động phát, tắt tiếng, lặp lại) ngay khi di chuột (hover)** qua thẻ video để xem trước nội dung.
    *   Trang xem video chi tiết (`/video/:slug`) chuyên nghiệp đồng bộ giao diện lịch sử cổ điển, có gợi ý danh sách các video liên quan ở thanh bên.
*   **Góp Ý & Báo Lỗi (`/bao-cao-loi`):** Form gửi phản hồi của độc giả trực tiếp tới Ban biên tập để hoàn thiện tính đúng đắn của dữ liệu lịch sử.

### 2. Phân Hệ Quản Trị (Admin Dashboard)
*   **Bảng Điều Khiển Tổng Quan:** Thống kê bài viết, báo cáo lỗi và nhật ký hoạt động.
*   **Quản Lý Bài Viết:** Quản lý vòng đời bài viết (nháp, chờ duyệt, từ chối, xuất bản công khai).
*   **Quản Lý Dòng Thời Gian:** Cập nhật các mốc sự kiện và triều đại.
*   **Phân Quyền Chi Tiết:** Quản trị viên cao cấp có khả năng phân cấp quyền hạn cho cộng tác viên và các biên tập viên.

---

## 🛠️ Công Nghệ Sử Dụng

Dự án được xây dựng trên nền tảng Frontend hiện đại nhằm đảm bảo hiệu năng tối đa và giao diện mượt mà:

*   **Bộ Khung Lõi:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) (Tối ưu hóa tốc độ tải và biên dịch HMR).
*   **Quản Lý Định Tuyến:** [React Router v7](https://reactrouter.com/) (Hỗ trợ phân trang và định tuyến lồng nhau mượt mà).
*   **Styling (Giao diện):** CSS tùy chỉnh cao cấp (Vanilla CSS) phối hợp linh hoạt cùng [Tailwind CSS v4](https://tailwindcss.com/) (thiết kế theo phong cách sepia, cổ kính sang trọng kết hợp các hiệu ứng chuyển động).
*   **Truy Vấn Dữ Liệu:** [TanStack Query v5 (React Query)](https://tanstack.com/query/latest) kết hợp [Axios](https://axios-http.com/) (Tự động lưu trữ bộ đệm - cache dữ liệu, tối ưu hóa các yêu cầu API, giúp tải trang nhanh chóng).
*   **Hiệu Ứng Chuyển Động:** [Motion (Framer Motion v12)](https://motion.dev/) (Tạo các hiệu ứng trượt, mờ dần sang trọng).
*   **Icons:** [Lucide React](https://lucide.dev/).
*   **Hiển Thị Văn Bản:** [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm) (Hiển thị nội dung lịch sử soạn thảo bằng cú pháp Markdown phong phú).

---

## 📂 Cấu Trúc Mã Nguồn

```text
src/
├── assets/          # Hình ảnh tĩnh và tài nguyên hệ thống
├── components/      # Các thành phần tái sử dụng (VideoCard, PostDetail, v.v.)
│   ├── admin/       # Các view phục vụ riêng cho admin
│   ├── article/     # Các thành phần hiển thị bài viết
│   ├── common/      # Header, Footer, Thanh thông báo dùng chung
│   ├── States/      # Trạng thái nạp dữ liệu (Loading, Error Wrapper)
│   └── Video/       # Thành phần thẻ Video
├── context/         # Quản lý trạng thái chung (Context API)
├── hooks/           # Custom hooks hỗ trợ (quản lý bộ lọc, phân trang, gọi API)
│   └── api/         # Hooks tương tác API qua React Query
├── layouts/         # Khung giao diện (MainLayout, AdminLayout)
├── lib/             # Cấu hình thư viện ngoài (HTTP Axios Client)
├── pages/           # Các trang giao diện chính (HomePage, VideoDetailPage, v.v.)
├── styles/          # Tệp định dạng CSS của ứng dụng
├── types/           # Định nghĩa các kiểu dữ liệu TypeScript
└── utils/           # Các hàm bổ trợ (Normalize dữ liệu lịch sử)
```

---

## 💻 Hướng Dẫn Cài Đặt và Chạy Dự Án

### Yêu Cầu Hệ Thống
*   Đã cài đặt [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản **v18** hoặc **v20** trở lên).
*   Đã cài đặt [Git](https://git-scm.com/).

### Các Bước Triển Khai

1.  **Tải mã nguồn về máy tính:**
    ```bash
    git clone https://github.com/Hoang-hai-yen/VNHistory.git
    cd VN-history-FE
    ```

2.  **Cài đặt các thư viện phụ thuộc:**
    ```bash
    npm install
    ```

3.  **Cấu hình môi trường kết nối API:**
    *   Tạo tệp `.env` ở thư mục gốc của dự án.
    *   Sao chép nội dung từ tệp mẫu `.env.example` hoặc thêm cấu hình cổng kết nối API Backend:
        ```env
        VITE_API_URL=http://localhost:3000/api
        ```

4.  **Chạy dự án ở chế độ phát triển (Local Server):**
    ```bash
    npm run dev
    ```
    *   Ứng dụng sẽ chạy tại địa chỉ mặc định: [http://localhost:5173](http://localhost:5173).

5.  **Đóng gói dự án để đưa lên máy chủ sản xuất (Production Build):**
    ```bash
    npm run build
    ```
    *   Mã nguồn đã biên dịch và tối ưu hóa sẽ được xuất ra thư mục `dist/`.

---

## 🤝 Phát Triển Đồng Đội

Mọi bài viết đóng góp hoặc sửa đổi xin vui lòng tuân thủ quy trình kiểm tra TypeScript để đảm bảo tính an toàn về mặt dữ liệu:
*   Để kiểm tra nhanh lỗi kiểu dữ liệu mà không cần build:
    ```bash
    npx tsc --noEmit
    ```
*   Để kiểm tra lỗi định dạng và cú pháp (Linter):
    ```bash
    npm run lint
    ```

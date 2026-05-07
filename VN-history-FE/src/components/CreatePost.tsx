// import React from 'react';
// import '../styles/CreatePost.css';

// const CreatePost: React.FC = () => {
//   return (
//     <div className="create-post-container">
//       <div className="create-post-header">
//         <h2 className="main-page-title">TẠO BÀI VIẾT MỚI</h2>
//       </div>

//       <div className="create-post-content">
//         {/* CỘT TRÁI: THÔNG TIN CHÍNH */}
//         <div className="main-form">
//           <section className="form-section">
//             <h3 className="section-title">THÔNG TIN CƠ BẢN</h3>
            
//             <div className="form-group">
//               <label>TIÊU ĐỀ<span className="required">*</span></label>
//               <input type="text" placeholder="Nhập tiêu đề bài viết..." />
//             </div>

//             <div className="form-group">
//               <label>TIÊU ĐỀ PHỤ</label>
//               <input type="text" placeholder="Nhập tiêu đề phụ (nếu có)..." />
//             </div>

//             <div className="form-group">
//               <label>MÔ TẢ NGẮN<span className="required">*</span></label>
//               <textarea rows={3} placeholder="Tóm tắt nội dung bài viết..."></textarea>
//             </div>

//             <div className="form-group">
//               <label>NỘI DUNG BÀI VIẾT<span className="required">*</span></label>
//               <textarea rows={12} placeholder="Viết nội dung chi tiết tại đây..."></textarea>
//             </div>
//           </section>

//           <section className="form-section">
//             <h3 className="section-title">TRÍCH DẪN / NGỮ LIỆU NỔI BẬT</h3>
//             <div className="form-group">
//               <textarea rows={5} placeholder="Nhập các trích dẫn quan trọng..."></textarea>
//             </div>
//           </section>

//           <section className="form-section">
//             <h3 className="section-title">NGUỒN TÀI LIỆU</h3>
//             <div className="form-group">
//               <label>NGUỒN CHÍNH<span className="required">*</span></label>
//               <input type="text" placeholder="Sách, tài liệu lịch sử chính..." />
//             </div>
//             <div className="form-group">
//               <label>NGUỒN BỔ SUNG</label>
//               <input type="text" placeholder="Link tham khảo, tài liệu khác..." />
//             </div>
//             <div className="form-group">
//               <label>NGUỒN BỔ SUNG</label>
//               <input type="text" placeholder="Link tham khảo, tài liệu khác..." />
//             </div>
//           </section>
//         </div>

//         {/* CỘT PHẢI: CẤU HÌNH & PHÂN LOẠI */}
//         <div className="side-panel">
//           {/* Box Xuất bản */}
//           <div className="side-box">
//             <h3 className="side-title">XUẤT BẢN</h3>
//             <div className="toggle-group">
//               <label className="switch">
//                 <input type="checkbox" defaultChecked />
//                 <span className="slider"></span>
//               </label>
//               <span className="label-text-gold">Cho phép bình luận</span>
//             </div>
//             <div className="toggle-group">
//               <label className="switch">
//                 <input type="checkbox" />
//                 <span className="slider"></span>
//               </label>
//               <span className="label-text-gold">Đánh dấu nổi bật</span>
//             </div>

//             <div className="publish-actions">
//               <button className="btn-save-draft">LƯU BẢN NHÁP</button>
//               <button className="btn-publish-now">XUẤT BẢN</button>
//             </div>
//           </div>

//           {/* Box Phân loại */}
//           <div className="side-box">
//             <h3 className="side-title">PHÂN LOẠI<span className="required">*</span></h3>
//             <div className="form-group">
//               <label>LOẠI NỘI DUNG</label>
//               <select>
//                 <option>Sự kiện</option>
//                 <option>Nhân vật</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>TRIỀU ĐẠI<span className="required">*</span></label>
//               <input type="text" />
//             </div>
//             <div className="form-group">
//               <label>NĂM / GIAI ĐOẠN<span className="required">*</span></label>
//               <input type="text" />
//             </div>
//             <div className="form-group">
//               <label>DANH MỤC SỰ KIỆN</label>
//               <input type="text" />
//             </div>
//             <div className="form-group">
//               <label>NHÂN VẬT LIÊN QUAN</label>
//               <input type="text" />
//             </div>
//             <div className="form-group">
//               <label>ĐỊA DANH</label>
//               <input type="text" />
//             </div>
//           </div>

//           {/* Box Hiển thị trên */}
//           <div className="side-box display-info">
//             <h3 className="side-title">HIỂN THỊ TRÊN</h3>
//             <p className="meta-hint">Dựa vào metadata, bài sẽ tự xuất hiện tại:</p>
//             <ul className="display-list">
//               <li><span className="icon-check">✓</span> Dòng thời gian (năm 938)</li>
//               <li><span className="icon-check">✓</span> Trang Triều Đại → Nhà Ngô</li>
//               <li><span className="icon-check">✓</span> Mục Kháng chiến</li>
//               <li><span className="icon-check">✓</span> Kết quả tìm kiếm</li>
//               <li><span className="icon-refresh">↻</span> Địa lý & Di tích (chưa đủ thông tin)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

interface Dynasty {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface FormData {
  title: string;
  subtitle: string;
  slug: string;
  summary: string;
  content: string;
  quote: string;
  cover_image_url: string;
  type: string;
  year_start: number;
  year_end: number;
  year_display: string;
  dynasty_id: string;
  category_id: string;
  is_featured: boolean;
}

const CreatePost: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [dynasties, setDynasties] = useState<Dynasty[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    slug: '',
    summary: '',
    content: '',
    quote: '',
    cover_image_url: '',
    type: 'event',
    year_start: 0,
    year_end: 0,
    year_display: '',
    dynasty_id: '',
    category_id: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchInitData();
  }, []);

  const fetchInitData = async () => {
    try {
      const token = localStorage.getItem('token');

      const dynastyRes = await axios.get(
        'http://localhost:3000/api/admin/timeline',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDynasties(dynastyRes.data.data || []);

      // nếu có API category thì thay bằng API thật
      setCategories([
        { id: '1', name: 'Kháng chiến' },
        { id: '2', name: 'Anh hùng dân tộc' },
        { id: '3', name: 'Di sản văn hoá' },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const createArticle = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:3000/api/admin/articles',
        {
          ...formData,
          status: 'draft',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Tạo bài viết thành công!');
    } catch (error) {
      console.log(error);
      alert('Tạo bài viết thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h2 className="main-page-title">
          TẠO BÀI VIẾT MỚI
        </h2>
      </div>

      <div className="create-post-content">

        {/* LEFT */}
        <div className="main-form">

          <section className="form-section">
            <h3 className="section-title">
              THÔNG TIN CƠ BẢN
            </h3>

            <div className="form-group">
              <label>
                TIÊU ĐỀ
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            <div className="form-group">
              <label>TIÊU ĐỀ PHỤ<span className="required">*</span></label>
              

              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Nhập tiêu đề phụ..."
              />
            </div>

            <div className="form-group">
              <label>ĐƯỜNG DẪN<span className="required">*</span></label>
              

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                MÔ TẢ NGẮN
                <span className="required">*</span>
              </label>

              <textarea
                rows={3}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Tóm tắt nội dung..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>
                NỘI DUNG
                <span className="required">*</span>
              </label>

              <textarea
                rows={12}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Nhập nội dung bài viết..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">
              TRÍCH DẪN
              <span className="required">*</span>
            </h3>

            <div className="form-group">
              <textarea
                rows={5}
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Nhập trích dẫn..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">
              ẢNH BÌA
            </h3>

            <div className="form-group">
              <label>URL ẢNH<span className="required">*</span></label>

              <input
                type="text"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="side-panel">

          {/* Publish */}
          <div className="side-box">
            <h3 className="side-title">
              LƯU BÀI VIẾT
            </h3>

            <div className="toggle-group">
              <label className="switch">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                />

                <span className="slider"></span>
              </label>

              <span className="label-text-gold">
                Đánh dấu nổi bật
              </span>
            </div>

            <div className="publish-actions">
              <button
                className="btn-save-draft"
                onClick={createArticle}
                disabled={loading}
              >
                {loading
                  ? 'ĐANG LƯU...'
                  : 'LƯU BẢN NHÁP'}
              </button>
            </div>
          </div>

          {/* Classification */}
          <div className="side-box">
            <h3 className="side-title">
              PHÂN LOẠI
            </h3>

            <div className="form-group">
              <label>LOẠI NỘI DUNG<span className="required">*</span></label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="event">
                  Sự kiện
                </option>

                <option value="person">
                  Nhân vật
                </option>

                <option value="place">
                  Di sản
                </option>

                <option value="video">
                  Khác
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                TRIỀU ĐẠI<span className="required">*</span>
              </label>

              <select
                name="dynasty_id"
                value={formData.dynasty_id}
                onChange={handleChange}
              >
                <option value="">
                  Chọn triều đại
                </option>

                {dynasties.map((dynasty) => (
                  <option
                    key={dynasty.id}
                    value={dynasty.id}
                  >
                    {dynasty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>DANH MỤC<span className="required">*</span></label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">
                  Chọn danh mục
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>NĂM BẮT ĐẦU<span className="required">*</span></label>

              <input
                type="number"
                name="year_start"
                value={formData.year_start}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>NĂM KẾT THÚC<span className="required">*</span></label>

              <input
                type="number"
                name="year_end"
                value={formData.year_end}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>HIỂN THỊ NĂM<span className="required">*</span></label>

              <input
                type="text"
                name="year_display"
                value={formData.year_display}
                onChange={handleChange}
                placeholder="VD: 938 hoặc 1418–1427"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
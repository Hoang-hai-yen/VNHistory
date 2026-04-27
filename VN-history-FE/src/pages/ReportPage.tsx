import React, { useState } from "react";
import { data, Link, useSearchParams } from "react-router";
import { FileText, Info, Clock, CheckCircle2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useCreateReportMutation,
  type CreateReportPayload,
} from "../hooks/api/useReports";

export default function ReportPage() {
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateReportPayload>();
  const params = useSearchParams();
  const articleId = params[0].get("article_id");
  const mutation = useCreateReportMutation();
  const onSubmit: SubmitHandler<CreateReportPayload> = (data) => {
    data.article_id = articleId ?? "";
    mutation.mutate(data, {
      onSuccess: () => {
        alert(
          "Báo cáo của bạn đã được gửi thành công! Cảm ơn sự đóng góp của bạn.",
        );
      },
      onError: () => {
        alert("Đã có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại sau.");
      },
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
          <Link to="/" className="hover:text-[#8B1A1A]">
            Trang Chủ
          </Link>
          <span className="opacity-40">›</span>
          <Link to="/dong-thoi-gian" className="hover:text-[#8B1A1A]">
            Chiến Thắng Bạch Đằng
          </Link>
          <span className="opacity-40">›</span>
          <span className="text-[#B8860B]">Báo cáo lỗi</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="text-[10px] font-bold text-[#B8860B] tracking-[0.12em] uppercase mb-1.5">
            Góp ý tư liệu
          </div>
          <h1 className="font-['Playfair_Display',serif] text-[28px] text-[#1c1c1c] font-bold">
            Báo Cáo Lỗi Nội Dung
          </h1>
          <hr className="mt-3 border-t border-[#e0dbd0]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Main Form */}
          <div className="border border-[#2e2510] rounded-sm p-6 lg:p-8 text-[#e8d9b0]">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Reference Box */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Bài viết được báo cáo
                </label>
                <div className="bg-[#0f0c04] border border-[#2e2510] rounded-sm p-3.5 flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-[#1e1a0a] border border-[#3a2e10] rounded-sm flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-[#8a7a4a]" />
                  </div>
                  <div className="flex-1 min-width-0">
                    <div className="text-[9px] text-[#c5a028] tracking-widest uppercase mb-0.5">
                      Sự kiện · Kháng chiến
                    </div>
                    <div className="font-['Playfair_Display',serif] text-[14px] text-[#e8d9b0] font-medium leading-tight">
                      Chiến Thắng Bạch Đằng (938)
                    </div>
                    <div className="text-[10px] text-[#5a4e28] font-['DM_Sans']">
                      lsvn.vn/su-kien/bach-dang-938
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[10px] text-[#8a7a4a] underline underline-offset-2 hover:text-[#e8d9b0] transition-colors"
                  >
                    Đổi bài
                  </button>
                </div>
                <p className="text-[10px] text-[#5a4e28] mt-2">
                  Trang bạn đang xem khi nhấn "Báo cáo lỗi"
                </p>
              </div>

              {/* Error Type */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Loại lỗi <span className="text-[#8b1a1a]">*</span>
                </label>
                <select
                  {...register("error_type", { required: true })}
                  className="w-full bg-[#0f0c04] border border-[#2e2510] rounded-sm p-2.5 text-[#e8d9b0] text-[12.5px] outline-none focus:border-[#c5a028] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">— Chọn loại lỗi —</option>
                  <option>Thông tin sai / không chính xác</option>
                  <option>Ngày tháng sai</option>
                  <option>Tên nhân vật / địa danh sai</option>
                  <option>Thiếu thông tin quan trọng</option>
                  <option>Hình ảnh không phù hợp</option>
                  <option>Lỗi chính tả / ngữ pháp</option>
                  <option>Nguồn tham khảo không hợp lệ</option>
                  <option>Khác</option>
                </select>
              </div>

              {/* Severity */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Mức độ nghiêm trọng
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: "low",
                      label: "Nhỏ",
                      color: "#639922",
                      activeBg: "#131d0a",
                      activeBorder: "#3b6d11",
                    },
                    {
                      id: "medium",
                      label: "Trung bình",
                      color: "#BA7517",
                      activeBg: "#1a1208",
                      activeBorder: "#854f0b",
                    },
                    {
                      id: "high",
                      label: "Nghiêm trọng",
                      color: "#c5302a",
                      activeBg: "#160808",
                      activeBorder: "#7a1010",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setSeverity(opt.id as any)}
                      className={`flex flex-col items-center p-2.5 border rounded-sm transition-all ${
                        severity === opt.id
                          ? `border-[${opt.activeBorder}] bg-[${opt.activeBg}]`
                          : "border-[#2e2510] bg-[#0f0c04] opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        borderColor:
                          severity === opt.id ? opt.activeBorder : "#2e2510",
                        backgroundColor:
                          severity === opt.id ? opt.activeBg : "#0f0c04",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mb-1.5"
                        style={{
                          backgroundColor:
                            severity === opt.id ? opt.color : "#3a3018",
                        }}
                      />
                      <span
                        className={`text-[10px] tracking-wide ${severity === opt.id ? "" : "text-[#8a7a4a]"}`}
                        style={{
                          color: severity === opt.id ? opt.color : "#8a7a4a",
                        }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#5a4e28] mt-2">
                  Trung bình: ảnh hưởng đến hiểu đúng sự kiện. Nghiêm trọng: sai
                  lệch lịch sử lớn.
                </p>
              </div>

              {/* Error Content */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Nội dung bị lỗi <span className="text-[#8b1a1a]">*</span>
                </label>
                <textarea
                  className="w-full bg-[#0f0c04] border border-[#2e2510] rounded-sm p-3 text-[#e8d9b0] text-[13px] font-['Source_Serif_4'] leading-relaxed outline-none focus:border-[#c5a028] min-h-[80px]"
                  placeholder="Trích dẫn đoạn văn bản hoặc mô tả vị trí nội dung bị sai trong bài..."
                  required
                  {...register("description", {
                    required: true,
                    maxLength: 1000,
                  })}
                ></textarea>
              </div>

              {/* Sources */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Nguồn tham khảo đề xuất
                </label>
                <input
                  type="text"
                  {...register("suggested_source")}
                  className="w-full bg-[#0f0c04] border border-[#2e2510] rounded-sm p-2.5 px-3.5 text-[#e8d9b0] text-[12px] outline-none focus:border-[#c5a028]"
                  placeholder="Tên sách, tác giả, link tài liệu... (không bắt buộc)"
                />
                <p className="text-[10px] text-[#5a4e28] mt-1.5">
                  Ví dụ: Đại Việt Sử Ký Toàn Thư, quyển 5, trang 84
                </p>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <label className="block text-[11px] font-bold text-[#8a7a4a] tracking-wider uppercase mb-2">
                  Thông tin liên hệ
                </label>
                <input
                  type="email"
                  {...register("reporter_email")}
                  className="w-full bg-[#0f0c04] border border-[#2e2510] rounded-sm p-2.5 px-3.5 text-[#e8d9b0] text-[12px] outline-none focus:border-[#c5a028]"
                  placeholder="Email của bạn (không bắt buộc — để admin phản hồi)"
                />
              </div>

              {/* Consents */}
              <div className="space-y-3 mb-10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="w-3.5 h-3.5 border border-[#c5a028] bg-[#1e1a0a] rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#c5a028] rounded-full" />
                  </div>
                  <span className="text-[11px] text-[#6a5a30] group-hover:text-[#8a7a4a] leading-tight">
                    Tôi xác nhận thông tin báo cáo này là trung thực và có cơ sở
                    lịch sử.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-[#2e2510]">
                <button
                  type="submit"
                  className="bg-[#8b1a1a] text-[#f5e0b0] px-7 py-3 text-[12px] font-bold tracking-wider uppercase rounded-sm hover:bg-[#a01c1c] transition-colors"
                >
                  Gửi Báo Cáo
                </button>
                <button
                  type="reset"
                  className="border border-[#2e2510] text-[#6a5a30] px-6 py-3 text-[12px] tracking-wider uppercase rounded-sm hover:border-[#c5a028] hover:text-[#c5a028] transition-all"
                >
                  Huỷ
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Guide Card */}
            <div className="bg-[#13100a] border border-[#2e2510] rounded-sm p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#c5a028] tracking-widest uppercase mb-4">
                <Info size={14} className="text-[#c5a028]" /> Hướng dẫn báo cáo
              </div>
              <div className="space-y-4">
                {[
                  "Chọn đúng loại lỗi để admin xử lý nhanh hơn.",
                  "Trích dẫn chính xác đoạn văn bản bị sai nếu có thể.",
                  "Cung cấp nguồn tài liệu để admin kiểm chứng — giúp xử lý nhanh hơn nhiều.",
                  "Báo cáo sẽ được xem xét trong vòng 3–5 ngày làm việc.",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 py-1.5 border-b border-[#1e1a0a] last:border-none last:pb-0"
                  >
                    <span className="text-[10px] text-[#c5a028] shrink-0">
                      {i + 1}.
                    </span>
                    <p className="text-[11.5px] text-[#8a7a4a] leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* History Card */}
            <div className="bg-[#13100a] border border-[#2e2510] rounded-sm p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#c5a028] tracking-widest uppercase mb-4">
                <Clock size={14} className="text-[#c5a028]" /> Báo cáo của bạn
              </div>
              <div className="space-y-4">
                <div className="pb-3.5 border-b border-[#1e1a0a]">
                  <div className="inline-flex items-center gap-1.5 bg-[#0a1306] border border-[#3b6d11] text-[#639922] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5">
                    <CheckCircle2 size={10} /> Đã xử lý
                  </div>
                  <div className="font-['Playfair_Display',serif] text-[12px] text-[#b0a070] font-medium leading-tight">
                    Ngày mất của Trần Hưng Đạo sai
                  </div>
                  <div className="text-[10px] text-[#4a3e20] mt-1.5 font-['DM_Sans']">
                    Gửi 12/03/2026 · Ngô Quyền – Nhà Ngô
                  </div>
                </div>
                <div className="pb-1.5 border-b border-[#1e1a0a] last:border-none">
                  <div className="inline-flex items-center gap-1.5 bg-[#1a1208] border border-[#854f0b] text-[#BA7517] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5">
                    <Clock size={10} /> Đang xem xét
                  </div>
                  <div className="font-['Playfair_Display',serif] text-[12px] text-[#b0a070] font-medium leading-tight">
                    Thiếu thông tin về Hội Nghị Diên Hồng
                  </div>
                  <div className="text-[10px] text-[#4a3e20] mt-1.5 font-['DM_Sans']">
                    Gửi 20/03/2026 · Nhà Trần
                  </div>
                </div>
              </div>
              <button className="mt-3 text-[10px] text-[#5a4e28] underline underline-offset-2 hover:text-[#c5a028] transition-colors">
                Xem tất cả báo cáo →
              </button>
            </div>

            {/* Note Card */}
            <div className="bg-[#110c04] border border-[#3a2208] rounded-sm p-5">
              <div className="text-[10px] font-bold text-[#c5a028] tracking-widest uppercase mb-2.5">
                Lưu ý
              </div>
              <p className="text-[11.5px] text-[#6a5a30] leading-relaxed">
                Hệ thống không hỗ trợ thêm nội dung mới qua form này. Nếu bạn
                muốn đóng góp tư liệu, vui lòng dùng chức năng{" "}
                <span className="text-[#c5a028] cursor-pointer hover:underline underline-offset-2">
                  Góp Ý Tư Liệu
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

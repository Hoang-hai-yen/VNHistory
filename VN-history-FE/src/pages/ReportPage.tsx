import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { FileText, Info, Clock, CheckCircle2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ReportSeverity } from "../types";
import {
  useCreateReportMutation,
  type CreateReportPayload,
} from "../hooks/api/useReports";
import { useArticleBySlug } from "../hooks/api/useArticles";

interface ReportPageState {
  article?: {
    id?: string;
    slug?: string;
    title?: string;
    typeLabel?: string;
    categoryLabel?: string | null;
  };
}

export default function ReportPage() {
  const [severity, setSeverity] = useState<ReportSeverity>("medium");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const routeState = (location.state as ReportPageState | null) ?? null;

  const articleIdFromQuery = searchParams.get("article_id") ?? "";
  const articleSlug = searchParams.get("article_slug") ?? "";
  const mutation = useCreateReportMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateReportPayload>();

  const { data: articleData } = useArticleBySlug(articleSlug);
  const articleContext = routeState?.article ?? {
    id: articleData?.id,
    slug: articleData?.slug,
    title: articleData?.title,
    typeLabel: articleData?.display.type_label,
    categoryLabel: articleData?.display.category_label,
  };

  const articleId = articleContext.id || articleIdFromQuery;
  const articleDetailUrl = articleContext.slug
    ? `/bai-viet/${articleContext.slug}`
    : undefined;
  const articleMeta = [articleContext.typeLabel, articleContext.categoryLabel]
    .filter(Boolean)
    .join(" · ");

  const onSubmit: SubmitHandler<CreateReportPayload> = (formData) => {
    mutation.mutate(
      {
        ...formData,
        article_id: articleId,
        severity,
      },
      {
        onSuccess: () => {
          alert("Báo cáo của bạn đã được gửi thành công. Cảm ơn sự đóng góp của bạn.");
          reset();
          setSeverity("medium");
        },
        onError: () => {
          alert("Đã có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại sau.");
        },
      },
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        {articleDetailUrl ? (
          <>
            <Link to={articleDetailUrl} className="hover:text-[#8B1A1A]">
              {articleContext.title || "Bài viết"}
            </Link>
            <span className="opacity-40">›</span>
          </>
        ) : null}
        <span className="text-[#B8860B]">Báo cáo lỗi</span>
      </div>

      <div className="mb-8">
        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#B8860B]">
          Góp ý tư liệu
        </div>
        <h1 className="font-['Playfair_Display',serif] text-[28px] font-bold text-[#1c1c1c]">
          Báo Cáo Lỗi Nội Dung
        </h1>
        <hr className="mt-3 border-t border-[#e0dbd0]" />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-sm border border-[#2e2510] p-6 text-[#e8d9b0] lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
                Bài viết được báo cáo
              </label>
              <div className="flex items-center gap-3.5 rounded-sm border border-[#2e2510] bg-[#0f0c04] p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#3a2e10] bg-[#1e1a0a]">
                  <FileText size={16} className="text-[#8a7a4a]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 text-[9px] uppercase tracking-widest text-[#c5a028]">
                    {articleMeta || "Bài viết lịch sử"}
                  </div>
                  <div className="font-['Playfair_Display',serif] text-[14px] font-medium leading-tight text-[#e8d9b0]">
                    {articleContext.title || "Không xác định bài viết"}
                  </div>
                  <div className="font-['DM_Sans'] text-[10px] text-[#5a4e28]">
                    {articleDetailUrl ? `lsvn.vn${articleDetailUrl}` : "Không có URL bài viết"}
                  </div>
                </div>
                {articleDetailUrl ? (
                  <Link
                    to={articleDetailUrl}
                    className="text-[10px] underline underline-offset-2 transition-colors hover:text-[#e8d9b0]"
                  >
                    Xem bài
                  </Link>
                ) : null}
              </div>
              {!articleId && (
                <p className="mt-2 text-[10px] text-[#c5302a]">
                  Không xác định được bài viết cần báo cáo. Hãy mở form này từ trang chi tiết bài viết.
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
                Loại lỗi <span className="text-[#8b1a1a]">*</span>
              </label>
              <select
                {...register("error_type", {
                  required: "Vui lòng chọn loại lỗi.",
                })}
                aria-invalid={!!errors.error_type}
                className="w-full cursor-pointer appearance-none rounded-sm border border-[#2e2510] bg-[#0f0c04] p-2.5 text-[12.5px] text-[#e8d9b0] outline-none transition-colors focus:border-[#c5a028]"
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
              {errors.error_type?.message && (
                <p className="mt-1.5 text-[10px] text-[#c5302a]">
                  {errors.error_type.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
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
                    onClick={() => setSeverity(opt.id as ReportSeverity)}
                    className="flex flex-col items-center rounded-sm border p-2.5 transition-all"
                    style={{
                      borderColor:
                        severity === opt.id ? opt.activeBorder : "#2e2510",
                      backgroundColor:
                        severity === opt.id ? opt.activeBg : "#0f0c04",
                      opacity: severity === opt.id ? 1 : 0.7,
                    }}
                  >
                    <div
                      className="mb-1.5 h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          severity === opt.id ? opt.color : "#3a3018",
                      }}
                    />
                    <span
                      className="text-[10px] tracking-wide"
                      style={{
                        color: severity === opt.id ? opt.color : "#8a7a4a",
                      }}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
                Nội dung bị lỗi <span className="text-[#8b1a1a]">*</span>
              </label>
              <textarea
                className="min-h-[100px] w-full rounded-sm border border-[#2e2510] bg-[#0f0c04] p-3 text-[13px] leading-relaxed text-[#e8d9b0] placeholder:text-[#6b5e38] outline-none focus:border-[#c5a028]"
                placeholder="Mô tả đoạn nội dung bị sai hoặc trích dẫn phần cần kiểm tra..."
                aria-invalid={!!errors.description}
                {...register("description", {
                  required: "Vui lòng nhập nội dung bị lỗi.",
                  maxLength: {
                    value: 1000,
                    message: "Nội dung tối đa 1000 ký tự.",
                  },
                  validate: (value) =>
                    (value?.trim().length ?? 0) > 0 ||
                    "Nội dung không được để trống.",
                })}
              />
              {errors.description?.message && (
                <p className="mt-1.5 text-[10px] text-[#c5302a]">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
                Nguồn tham khảo đề xuất
              </label>
              <input
                type="text"
                {...register("suggested_source", {
                  maxLength: {
                    value: 255,
                    message: "Nguồn tham khảo tối đa 255 ký tự.",
                  },
                })}
                aria-invalid={!!errors.suggested_source}
                className="w-full rounded-sm border border-[#2e2510] bg-[#0f0c04] p-2.5 px-3.5 text-[12px] text-[#e8d9b0] outline-none focus:border-[#c5a028]"
                placeholder="Tên sách, tác giả, link tài liệu..."
              />
              {errors.suggested_source?.message && (
                <p className="mt-1.5 text-[10px] text-[#c5302a]">
                  {errors.suggested_source.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
                Thông tin liên hệ
              </label>
              <input
                type="email"
                {...register("reporter_email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không đúng định dạng.",
                  },
                })}
                aria-invalid={!!errors.reporter_email}
                className="w-full rounded-sm border border-[#2e2510] bg-[#0f0c04] p-2.5 px-3.5 text-[12px] text-[#e8d9b0] outline-none focus:border-[#c5a028]"
                placeholder="Email của bạn để admin phản hồi nếu cần"
              />
              {errors.reporter_email?.message && (
                <p className="mt-1.5 text-[10px] text-[#c5302a]">
                  {errors.reporter_email.message}
                </p>
              )}
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="mb-6 text-[10px] text-[#c5302a]">
                Vui lòng kiểm tra các trường bị lỗi ở bên trên.
              </div>
            )}

            <div className="mt-8 flex gap-3 border-t border-[#2e2510] pt-6">
              <button
                type="submit"
                disabled={!articleId || mutation.isPending}
                className="rounded-sm bg-[#8b1a1a] px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-[#f5e0b0] transition-colors hover:bg-[#a01c1c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutation.isPending ? "Đang gửi..." : "Gửi Báo Cáo"}
              </button>
              <button
                type="reset"
                onClick={() => reset()}
                className="rounded-sm border border-[#2e2510] px-6 py-3 text-[12px] uppercase tracking-wider text-[#6a5a30] transition-all hover:border-[#c5a028] hover:text-[#c5a028]"
              >
                Huỷ
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-sm border border-[#2e2510] bg-[#13100a] p-5">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c5a028]">
              <Info size={14} className="text-[#c5a028]" /> Hướng dẫn báo cáo
            </div>
            <div className="space-y-4">
              {[
                "Chọn đúng loại lỗi để admin xử lý nhanh hơn.",
                "Nêu rõ phần nội dung nào sai và vì sao sai.",
                "Đính kèm nguồn tham khảo nếu bạn có tài liệu kiểm chứng.",
                "Báo cáo thường được xem xét trong vòng 3–5 ngày làm việc.",
              ].map((text, index) => (
                <div
                  key={text}
                  className="flex gap-2.5 border-b border-[#1e1a0a] py-1.5 last:border-none last:pb-0"
                >
                  <span className="shrink-0 text-[10px] text-[#c5a028]">
                    {index + 1}.
                  </span>
                  <p className="text-[11.5px] leading-relaxed text-[#8a7a4a]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#2e2510] bg-[#13100a] p-5">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c5a028]">
              <Clock size={14} className="text-[#c5a028]" /> Trạng thái xử lý mẫu
            </div>
            <div className="space-y-4">
              <div className="border-b border-[#1e1a0a] pb-3.5">
                <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#3b6d11] bg-[#0a1306] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#639922]">
                  <CheckCircle2 size={10} /> Đã xử lý
                </div>
                <div className="font-['Playfair_Display',serif] text-[12px] font-medium leading-tight text-[#b0a070]">
                  Báo cáo được xác minh và cập nhật vào bài viết
                </div>
              </div>
              <div className="pb-1.5">
                <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#854f0b] bg-[#1a1208] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#BA7517]">
                  <Clock size={10} /> Đang xem xét
                </div>
                <div className="font-['Playfair_Display',serif] text-[12px] font-medium leading-tight text-[#b0a070]">
                  Admin đang đối chiếu báo cáo với nguồn tư liệu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

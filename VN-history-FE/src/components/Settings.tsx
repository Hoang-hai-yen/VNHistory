import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const Settings: React.FC = () => {

  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [siteEmail, setSiteEmail] = useState("");

  const [allowComments, setAllowComments] = useState(false);
  const [notifyOnReport, setNotifyOnReport] = useState(false);

  const [allowCommentsDesc, setAllowCommentsDesc] = useState("");
  const [notifyOnReportDesc, setNotifyOnReportDesc] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/settings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SETTINGS RESPONSE:");
        console.log(res.data);

        const settings = res.data.asObject;

        // Website info
        setSiteName(settings.site_name?.value || "");
        setDescription(settings.site_description?.value || "");
        setSiteEmail(settings.site_email?.value || "");

        // Switch values
        setAllowComments(
          settings.allow_comments?.value === "true"
        );

        setNotifyOnReport(
          settings.notify_on_report?.value === "true"
        );

        // Switch descriptions
        setAllowCommentsDesc(
          settings.allow_comments?.description || ""
        );

        setNotifyOnReportDesc(
          settings.notify_on_report?.description || ""
        );

      } catch (error) {
        console.log(error);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveWebsiteInfo = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:3000/api/admin/settings",
        {
          site_name: siteName,
          site_description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cập nhật thông tin website thành công");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Cập nhật thất bại"
      );
    }
  };

  const handleSavePublishSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:3000/api/admin/settings",
        {
          allow_comments: allowComments,
          notify_on_report: notifyOnReport,
          site_email: siteEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cập nhật cài đặt thành công");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Cập nhật thất bại"
      );
    }
  };

  return (
    <div className="settings-page">

      <h2 className="settings-main-title">
        CÀI ĐẶT HỆ THỐNG
      </h2>

      <div className="settings-grid">

        {/* Cột 1 */}
        <div className="settings-card">

          <h3 className="card-header-title">
            THÔNG TIN WEBSITE
          </h3>

          <div className="form-group">

            <label>TÊN WEBSITE</label>

            <input
              type="text"
              value={siteName}
              onChange={(e) =>
                setSiteName(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>MÔ TẢ WEBSITE</label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

          <button
            className="btn-save-gold"
            onClick={handleSaveWebsiteInfo}
          >
            LƯU THAY ĐỔI
          </button>

        </div>

        {/* Cột 2 */}
        <div className="settings-card">

          <h3 className="card-header-title">
            CÀI ĐẶT XUẤT BẢN
          </h3>

          {/* allow_comments */}
          <div className="switch-group">

            <label className="switch-container">

              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) =>
                  setAllowComments(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

            <span className="switch-label">
              {allowCommentsDesc}
            </span>

          </div>

          {/* notify_on_report */}
          <div className="switch-group">

            <label className="switch-container">

              <input
                type="checkbox"
                checked={notifyOnReport}
                onChange={(e) =>
                  setNotifyOnReport(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

            <span className="switch-label">
              {notifyOnReportDesc}
            </span>

          </div>

          {/* Email */}
          <div className="form-group mt-20">

            <label>EMAIL NHẬN THÔNG BÁO</label>

            <input
              type="email"
              value={siteEmail}
              placeholder={siteEmail}
              onChange={(e) =>
                setSiteEmail(e.target.value)
              }
            />

          </div>

          <button
            className="btn-save-gold"
            onClick={handleSavePublishSettings}
          >
            LƯU THAY ĐỔI
          </button>

        </div>
      </div>
    </div>
  );
};

export default Settings;
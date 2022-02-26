import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UploadResume = ({ access_token }) => {
  const [resume, setResume] = useState(null);

  const router = useRouter();

  const {
    loading,
    user,
    uploaded,
    error,
    clearErrors,
    uploadResume,
    setUploaded,
  } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (uploaded) {
      setUploaded(false);
      toast.success("Your resume is uploaded successfully.");
    }
  }, [error, uploaded]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);

    uploadResume(formData, access_token);
  };

  const onChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {user && user.resume && (
                <>
                  <h4 className="text-center my-3">OR</h4>

                  <Link href={`https://jobbee.s3.amazonaws.com/${user.resume}`}>
                    <a
                      className="text-success text-center ml-4"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <b>
                        <i aria-hidden className="fas fa-download"></i> Download
                        Your Resume
                      </b>
                    </a>
                  </Link>
                </>
              )}

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;

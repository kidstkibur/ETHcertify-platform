import React from "react";
import "../styles/certeficate.css"; // Import the CSS file

const Certificate = ({ name, fieldStudy }) => {
  return (
    <div className="container pm-certificate-container">
      <div className="outer-border"></div>
      <div className="inner-border"></div>

      <div className="pm-certificate-border">
        <div className="row pm-certificate-header">
          <div className="pm-certificate-title cursive text-center">
            <h2>Certificate of Graduation</h2>
            <h4>Bachelor of Science (BSc)</h4>
            <h5>Addis Ababa University</h5>
          </div>
        </div>

        <div className="row pm-certificate-body">
          <div className="pm-certificate-block">
            <div className="row">
              <div className="col-xs-2"></div>
              <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                <span className="pm-name-text bold">{name}</span>
              </div>
              <div className="col-xs-2"></div>
            </div>

            <div className="row">
              <div className="col-xs-2"></div>
              <div className="pm-earned col-xs-8 text-center">
                <span className="pm-earned-text padding-0 block cursive">
                  has successfully completed the requirements for the degree of
                </span>
                <span className="pm-credits-text block bold sans">
                  Bachelor of Science (BSc) in {fieldStudy}
                </span>
              </div>
              <div className="col-xs-2"></div>
            </div>

            <div className="row">
              <div className="col-xs-2"></div>
              <div className="pm-course-title col-xs-8 text-center">
                <span className="pm-earned-text block cursive">
                  conferred this
                </span>
                <span className="pm-credits-text block bold sans">
                  [Graduation Date]
                </span>
              </div>
              <div className="col-xs-2"></div>
            </div>
          </div>

          <div className="row">
            <div className="pm-certificate-footer">
              <div className="col-xs-4 pm-certified text-center">
                <span className="pm-credits-text block sans">
                  Addis Ababa University
                </span>
                <span className="pm-empty-space block underline"></span>
                <span className="bold block">
                  Dr. [Dean Name], Dean, [Department Name]
                </span>
              </div>
              <div className="col-xs-4"></div>
              <div className="col-xs-4 pm-certified text-center">
                <span className="pm-credits-text block sans">
                  Date of Issue
                </span>
                <span className="pm-empty-space block underline"></span>
                <span className="bold block">[Date]</span>
                <span className="bold block">University Seal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

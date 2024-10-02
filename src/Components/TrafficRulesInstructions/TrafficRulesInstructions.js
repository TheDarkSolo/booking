import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './TrafficRulesInstructions.css';

const TrafficRulesInstructions = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const apiUrl = "/api/stream/departments/";

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  // Render the dropdown or single link button
  const renderLinks = (links) => {
    if (!links || links.length === 0) return null;

    const validLinks = links.filter(link => link.startsWith('http'));

    if (validLinks.length === 1) {
      // Render a single link button if there's only one link
      return (
        <a
          href={validLinks[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-link"
          title={t("streamWatch")}
        >
          {t("streamWatch")}
        </a>
      );
    } else if (validLinks.length > 1) {
      // Render a dropdown if there are multiple links
      return (
        <div className="dropdownStream">
          <button className="dropdown-button">
            {t("streamWatch")}
          </button>
          <div className="dropdown-content">
            {validLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Камера {index + 1}
              </a>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const tableRows = data.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td style={{ textAlign: 'center' }}>
        {renderLinks(item.link)}
      </td>
      <td style={{ textAlign: 'center' }}>
        {renderLinks(item.linkPractice)}
      </td>
    </tr>
  ));

  return (
    <div className="offset_traffic_rules_inst">
      <br />
      <center>
        <h2>{t("stream")}</h2>
      </center>
      <br />
      <div id="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>№</th>
              <th>{t("streamSectorName")}</th>
              <th style={{ textAlign: 'center' }}>Теория</th>
              <th style={{ textAlign: 'center' }}>Практика</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TrafficRulesInstructions;
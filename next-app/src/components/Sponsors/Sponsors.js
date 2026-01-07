"use client";

import React from 'react';
import styles from './Sponsors.module.css';

// Mock data schema as requested: [{logo: image_url, type: string}]
// Leaving empty initially to show "To be announced" or can be populated.
const SPONSORS_DATA = [
    // { logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", type: "Title Sponsor" },
    // { logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", type: "Associate Sponsor" },
    // { logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", type: "Associate Sponsor" },
    // { logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", type: "Power Sponsor" },
];

export default function Sponsors() {
    // Group data by type
    const groupedSponsors = SPONSORS_DATA.reduce((acc, sponsor) => {
        const { type } = sponsor;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(sponsor);
        return acc;
    }, {});

    const hasSponsors = Object.keys(groupedSponsors).length > 0;

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Sponsors</h2>

            {!hasSponsors ? (
                <div className={styles.toBeAnnounced}>
                    To Be Announced
                </div>
            ) : (
                <div className={styles.sponsorsList}>
                    {Object.entries(groupedSponsors).map(([type, sponsors], index) => (
                        <div
                            key={type}
                            className={styles.group}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <h3 className={styles.groupTitle}>{type}</h3>
                            <div className={styles.row}>
                                {sponsors.map((sponsor, idx) => (
                                    <div key={idx} className={styles.sponsorCard}>
                                        <img
                                            src={sponsor.logo}
                                            alt={`${type} - Sponsor`}
                                            className={styles.logo}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

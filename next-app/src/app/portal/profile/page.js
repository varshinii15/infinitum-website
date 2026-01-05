'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';

import { withStyles } from '@/tools/withStyles';
import { Secuence as SecuenceComponent } from '@/components/Secuence';

const styles = theme => {
    return {
        root: {
            margin: 'auto',
            width: '100%',
            minHeight: '100vh',
            padding: [40, 20],
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        container: {
            maxWidth: 800,
            margin: [0, 'auto']
        },
        // Header Section
        header: {
            background: `rgba(26, 2, 11, 0.9)`,
            border: `1px solid rgba(199, 32, 113, 0.3)`,
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
            boxShadow: `0 0 40px rgba(199, 32, 113, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.5)`
        },
        headerContent: {
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            '@media (max-width: 600px)': {
                flexDirection: 'column',
                textAlign: 'center'
            }
        },
        avatar: {
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${theme.color.secondary.main} 0%, ${theme.color.secondary.dark} 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: theme.typography.primary,
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
        },
        headerInfo: {
            '& h1': {
                fontFamily: theme.typography.primary,
                fontSize: '1.8rem',
                fontWeight: 700,
                color: theme.color.heading.main,
                marginBottom: 4,
                textShadow: `0 0 20px ${theme.color.secondary.main}`
            }
        },
        uniqueId: {
            color: theme.color.secondary.light,
            fontSize: '1rem',
            marginBottom: 8
        },
        badge: {
            display: 'inline-block',
            padding: [6, 16],
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 600
        },
        badgeVerified: {
            background: 'rgba(34, 197, 94, 0.2)',
            color: '#86efac',
            border: '1px solid rgba(34, 197, 94, 0.4)'
        },
        badgePending: {
            background: 'rgba(234, 179, 8, 0.2)',
            color: '#fde047',
            border: '1px solid rgba(234, 179, 8, 0.4)'
        },
        // Sections
        section: {
            background: 'rgba(26, 2, 11, 0.9)',
            border: '1px solid rgba(199, 32, 113, 0.3)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            boxShadow: '0 0 30px rgba(199, 32, 113, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.4)',
            '& h2': {
                fontFamily: theme.typography.primary,
                fontSize: '1.2rem',
                fontWeight: 600,
                color: theme.color.heading.main,
                marginBottom: 16,
                textShadow: `0 0 10px rgba(199, 32, 113, 0.3)`
            }
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16
        },
        infoCard: {
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(199, 32, 113, 0.2)',
            borderRadius: 10,
            padding: 16,
            '& label': {
                display: 'block',
                fontSize: '0.8rem',
                color: '#888888',
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            },
            '& p': {
                color: theme.color.heading.main,
                fontSize: '1rem',
                fontWeight: 500
            }
        },
        // QR Section
        qrContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        qrWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16
        },
        qrCode: {
            background: '#ffffff',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 0 20px rgba(199, 32, 113, 0.3)'
        },
        qrInfo: {
            textAlign: 'center',
            '& p': {
                color: theme.color.heading.main,
                fontSize: '0.9rem',
                fontWeight: 600
            }
        },
        qrHint: {
            color: '#888888 !important',
            fontSize: '0.85rem !important',
            marginTop: 4
        },
        // Payment
        paymentCard: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(199, 32, 113, 0.2)',
            borderRadius: 10,
            padding: [16, 20],
            '@media (max-width: 600px)': {
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center'
            }
        },
        paymentBadge: {
            padding: [8, 16],
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 600
        },
        paymentPaid: {
            background: 'rgba(34, 197, 94, 0.2)',
            color: '#86efac'
        },
        paymentUnpaid: {
            background: 'rgba(220, 38, 38, 0.2)',
            color: '#fca5a5'
        },
        // Actions
        actions: {
            display: 'flex',
            gap: 16,
            marginTop: 24,
            '@media (max-width: 600px)': {
                flexDirection: 'column'
            }
        },
        btn: {
            flex: 1,
            padding: [14, 24],
            border: 'none',
            borderRadius: 8,
            fontFamily: theme.typography.primary,
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
        },
        btnSecondary: {
            background: 'transparent',
            border: `1px solid rgba(199, 32, 113, 0.5)`,
            color: theme.color.secondary.light,
            '&:hover': {
                background: 'rgba(199, 32, 113, 0.1)',
                borderColor: theme.color.secondary.main,
                boxShadow: '0 0 20px rgba(199, 32, 113, 0.3)'
            }
        },
        btnDanger: {
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            color: '#ffffff',
            '&:hover': {
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                transform: 'translateY(-2px)'
            }
        },
        // Loading
        loading: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            color: theme.color.text.main
        },
        spinner: {
            width: 48,
            height: 48,
            border: `3px solid rgba(199, 32, 113, 0.2)`,
            borderTopColor: theme.color.secondary.main,
            borderRadius: '50%',
            marginBottom: 16,
            animation: '$spin 1s linear infinite'
        },
        '@keyframes spin': {
            to: { transform: 'rotate(360deg)' }
        }
    };
};

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        };
    }

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = async () => {
        try {
            const { authService } = await import('@/services/authService');
            const response = await authService.getProfile();
            this.setState({ user: response.user, loading: false });
        } catch (error) {
            // Not authenticated, redirect to login
            window.location.href = '/auth?type=login';
        }
    };

    handleLogout = async () => {
        try {
            const { authService } = await import('@/services/authService');
            const { clearAuthToken } = await import('@/services/api');
            await authService.logout();
            clearAuthToken();
            window.location.href = '/auth?type=login';
        } catch (error) {
            console.error('Logout error:', error);
            window.location.href = '/auth?type=login';
        }
    };

    handleBack = () => {
        window.location.href = '/';
    };

    render() {
        const { classes } = this.props;
        const { user, loading } = this.state;

        if (loading) {
            return (
                <SecuenceComponent>
                    <div className={classes.root}>
                        <div className={classes.loading}>
                            <div className={classes.spinner}></div>
                            <p>Loading your profile...</p>
                        </div>
                    </div>
                </SecuenceComponent>
            );
        }

        if (!user) {
            return null;
        }

        return (
            <SecuenceComponent>
                <div className={classes.root}>
                    <div className={classes.container}>
                        {/* Header */}
                        <div className={classes.header}>
                            <div className={classes.headerContent}>
                                <div className={classes.avatar}>
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className={classes.headerInfo}>
                                    <h1>{user.name}</h1>
                                    <p className={classes.uniqueId}>ID: {user.uniqueId}</p>
                                    <span className={`${classes.badge} ${user.verified ? classes.badgeVerified : classes.badgePending}`}>
                                        {user.verified ? '✓ Verified' : 'Pending Verification'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className={classes.section}>
                            <h2>Your QR Code</h2>
                            <div className={classes.qrContainer}>
                                <div className={classes.qrWrapper}>
                                    <div className={classes.qrCode}>
                                        <QRCodeSVG
                                            value={JSON.stringify({
                                                type: "PARTICIPANT",
                                                uniqueId: user.uniqueId
                                            })}
                                            size={180}
                                            level="H"
                                        />
                                    </div>
                                    <div className={classes.qrInfo}>
                                        <p>ID: {user.uniqueId}</p>
                                        <p className={classes.qrHint}>Scan at the event for check-in</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className={classes.section}>
                            <h2>Personal Information</h2>
                            <div className={classes.grid}>
                                <div className={classes.infoCard}>
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className={classes.infoCard}>
                                    <label>Phone</label>
                                    <p>{user.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className={classes.section}>
                            <h2>Academic Information</h2>
                            <div className={classes.grid}>
                                <div className={classes.infoCard}>
                                    <label>College</label>
                                    <p>{user.college}</p>
                                </div>
                                <div className={classes.infoCard}>
                                    <label>Department</label>
                                    <p>{user.department}</p>
                                </div>
                                <div className={classes.infoCard}>
                                    <label>Year</label>
                                    <p>{user.year} Year</p>
                                </div>
                                <div className={classes.infoCard}>
                                    <label>Student Type</label>
                                    <p>{user.isPSGStudent ? 'PSG Student' : 'External Student'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className={classes.section}>
                            <h2>Event Details</h2>
                            <div className={classes.grid}>
                                <div className={classes.infoCard}>
                                    <label>Registration Source</label>
                                    <p style={{ textTransform: 'capitalize' }}>{user.source}</p>
                                </div>
                                {user.discoveryMethod && (
                                    <div className={classes.infoCard}>
                                        <label>Discovery Method</label>
                                        <p style={{ textTransform: 'capitalize' }}>{user.discoveryMethod.replace('_', ' ')}</p>
                                    </div>
                                )}
                                <div className={classes.infoCard}>
                                    <label>Accommodation</label>
                                    <p>{user.accomodation ? 'Yes' : 'No'}</p>
                                </div>
                                {user.referral && (
                                    <div className={classes.infoCard}>
                                        <label>Referral Code</label>
                                        <p>{user.referral}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className={classes.section}>
                            <h2>Payment Status</h2>
                            <div className={classes.paymentCard}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888888', marginBottom: 4, textTransform: 'uppercase' }}>General Fee</label>
                                    <p style={{ color: '#eeeeee', fontSize: '1rem', fontWeight: 500 }}>{user.generalFeePaid ? 'Paid' : 'Not Paid'}</p>
                                </div>
                                <span className={`${classes.paymentBadge} ${user.generalFeePaid ? classes.paymentPaid : classes.paymentUnpaid}`}>
                                    {user.generalFeePaid ? '✓ Paid' : '✗ Unpaid'}
                                </span>
                            </div>
                        </div>

                        {/* Last Visited */}
                        <div className={classes.section}>
                            <div className={classes.infoCard}>
                                <label>Last Visited</label>
                                <p>{user.lastVisited ? new Date(user.lastVisited).toLocaleString() : 'N/A'}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={classes.actions}>
                            <button onClick={this.handleBack} className={`${classes.btn} ${classes.btnSecondary}`}>
                                Back to Home
                            </button>
                            <button onClick={this.handleLogout} className={`${classes.btn} ${classes.btnDanger}`}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </SecuenceComponent>
        );
    }
}

ProfilePage.propTypes = {
    classes: PropTypes.any.isRequired
};

export default withStyles(styles)(ProfilePage);

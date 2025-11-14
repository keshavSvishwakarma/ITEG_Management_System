import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Line,
  Circle,
  G,
} from "@react-pdf/renderer";

import logo from "../../assets/images/doulLogo.png";
import profileIcon from "../../assets/icons/StuReportprofile_icon.png";
import courseIcon from "../../assets/icons/StuReportCourse_icon.png";
import mailIcon from "../../assets/icons/StuReportMail_icon.png";
import fatherIcon from "../../assets/icons/StuReportFather_icon.png";
import contactIcon from "../../assets/icons/StuReport_Phone.png";
import addressIcon from "../../assets/icons/StuReportAddress_icon.png";

/* =================== Styles =================== */
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 12,
    fontFamily: "Helvetica",
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#7335DD",
    borderBottomStyle: "solid",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 70,
    flexShrink: 0,
  },
  headerCenter: { flexGrow: 1, alignItems: "center", paddingHorizontal: 8 },
  headerRight: { minWidth: 120, alignItems: "flex-end" },

  logo: {
    width: 78,
    height: 52,
    objectFit: "contain",
    maxWidth: "100%",
  },

  title: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  subMuted: { fontSize: 9, color: "#6B7280" },
  subBold: { fontSize: 10, color: "#111827", fontWeight: "bold" },

  /* Section/Card */
  section: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  /* Info grid */
  infoGrid: { flexDirection: "row", flexWrap: "wrap" },
  infoCell: { width: "33.3333%", paddingRight: 4, marginBottom: 4 },
  infoTop: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  icon: { width: 11, height: 11, marginRight: 6 },
  label: { fontSize: 9, color: "#6B7280", fontWeight: "bold" },
  value: { fontSize: 10, color: "#111827" },

  /* Level Progress */
  levelWrap: { paddingVertical: 6 },
  levelLegend: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: { fontSize: 9, color: "#374151", textAlign: "center", width: 28 },

  /* Two-column main row: left = 28%, right = 68% (adjusted) */
  mainRow: { flexDirection: "row", gap: 8, marginBottom: 6, width: "100%" },
  leftCol30: {
    width: "28%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
    padding: 10,
    minWidth: 0,
  },
  rightCol60: {
    width: "68%",
    flexDirection: "column",
  },

  /* Top half inside right column: two columns (Soft | Discipline) */
  // make row stretch children and set a minHeight so both columns equalize
  rightTopRow: {
    flexDirection: "row",
    marginBottom: 6,
    justifyContent: "space-between",
    alignItems: "stretch", // important to equalize height
    minHeight: 120, // adjust this value if you want taller/shorter equal boxes
  },
  // give each column flex:1 so they share available height equally
  rightTopCol: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    minWidth: 0,
    justifyContent: "flex-start", // content top-aligned
  },

  /* Add gap between the two top cols via marginRight on first */
  rightTopColLeftGap: {
    marginRight: 8,
  },

  /* Bottom half inside right column: Co-curricular cards */
  rightBottomRow: { width: "100%", marginTop: 6 },
  coCardsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  coCard: {
    width: "31%",
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  coCardTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  coCardCount: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    textAlign: "center",
  },

  /* Progress list */
  skillRow: { marginBottom: 8 },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  small: { fontSize: 9, color: "#374151" },
  barTrack: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: { height: 8, backgroundColor: "#7335DD" },

  /* Soft skills */
  softRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  softLeft: { fontSize: 9.5, color: "#374151" },
  softRight: { fontSize: 9.5, fontWeight: "bold" },

  /* Career readiness (4 in one row) */
  readinessRow: { flexDirection: "row", justifyContent: "space-between" },
  pill: {
    width: "23%",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
  },
  pillLabel: { fontSize: 9, color: "#6B7280", marginBottom: 6, textAlign: "center" },
  pillValue: { fontSize: 10, fontWeight: "bold", color: "#111827", textAlign: "center" },

/* Footer */
footer: {
  marginTop: 8,
  padding: 12,
  backgroundColor: "#7335DD",
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "space-between",
},

footerColumn: {
  width: "33%",
},

footerHeading: {
  fontSize: 10,
  color: "#FFFFFF",
  fontWeight: "bold",
  marginBottom: 4,
},

footerValue: {
  fontSize: 10,
  color: "#FFFFFF",
},

});

/* =================== Helpers =================== */
const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoCell}>
    <View style={styles.infoTop}>
      <Image src={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);

const ProgressBar = ({ percent }) => (
  <View style={styles.barTrack}>
    <View
      style={[
        styles.barFill,
        { width: `${Math.max(0, Math.min(100, Number(percent) || 0))}%` },
      ]}
    />
  </View>
);

const SoftItem = ({ title, status }) => (
  <View style={styles.softRow}>
    <Text style={styles.softLeft}>{title}</Text>
    <Text
      style={[
        styles.softRight,
        {
          color:
            status === "Excellent"
              ? "#059669"
              : status === "Good"
              ? "#2563EB"
              : status === "Average"
              ? "#D97706"
              : "#DC2626",
        },
      ]}
    >
      {status}
    </Text>
  </View>
);

const softStatus = (score, max) => {
  const pct = (Number(score || 0) / Number(max || 1)) * 100;
  if (pct >= 90) return "Excellent";
  if (pct >= 70) return "Good";
  if (pct >= 50) return "Average";
  return "Poor";
};

/* Level steps array */
const LEVEL_STEPS = ["1A", "1B", "1C", "2A", "2B", "2C"];

/* =================== Level Timeline Component =================== */
const LevelTimeline = ({ currentLevel = "1A" }) => {
  const steps = LEVEL_STEPS;
  const currentLevelUpper = String(currentLevel || "1A").toUpperCase();
  const currentIdx = Math.max(
    0,
    steps.findIndex((s) => s.toUpperCase() === currentLevelUpper)
  );

  const width = 480;
  const padding = 20;
  const yCenter = 15;
  const circleRadius = 12;
  const lineStrokeWidth = 3;

  const innerWidth = width - padding * 2;
  const pts = steps.map((_, i) => padding + (i * innerWidth) / (steps.length - 1));
  const progressLineEnd = pts[currentIdx];

  return (
    <View style={styles.levelWrap}>
      <Svg width={width} height="50" viewBox={`0 0 ${width} 50`}>
        <Line
          x1={pts[0]}
          y1={yCenter}
          x2={pts[steps.length - 1]}
          y2={yCenter}
          stroke="#E5E7EB"
          strokeWidth={lineStrokeWidth}
        />
        <Line
          x1={pts[0]}
          y1={yCenter}
          x2={progressLineEnd}
          y2={yCenter}
          stroke="#10B981"
          strokeWidth={lineStrokeWidth}
        />

        {pts.map((x, i) => {
          const isPassed = i < currentIdx;
          const isCurrent = i === currentIdx;

          const circleFill = isPassed ? "#10B981" : isCurrent ? "#F59E0B" : "#E5E7EB";
          const labelColor = isCurrent ? "#F59E0B" : "#374151";

          return (
            <G key={i}>
              <Circle
                cx={x}
                cy={yCenter}
                r={circleRadius}
                fill={circleFill}
                stroke={isCurrent ? "#F59E0B" : "none"}
                strokeWidth={isCurrent ? 1 : 0}
              />

              {isPassed && (
                <Text
                  x={x}
                  y={yCenter + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  ✓
                </Text>
              )}

              {!isPassed && (
                <Text
                  x={x}
                  y={yCenter + 3}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isCurrent ? "white" : "#6B7280"}
                  fontWeight={isCurrent ? "bold" : "normal"}
                >
                  {steps[i]}
                </Text>
              )}

              <Text
                x={x}
                y={yCenter + 25}
                textAnchor="middle"
                fontSize="8"
                fill={labelColor}
                fontWeight={isCurrent ? "bold" : "normal"}
              >
                {steps[i]}
              </Text>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

/* =================== Main Component =================== */
const StudentReportPDF = ({ studentData = {}, reportCardData = {} }) => {
  const technicalSkills =
    reportCardData?.technicalSkills?.map((s) => ({
      name: s?.skillName || "Skill",
      percent: Math.round(Number(s?.totalPercentage || 0)),
    })) || [];

  const softCats = reportCardData?.softSkills?.categories || [];
  const discCats = reportCardData?.discipline?.categories || [];

  const co = reportCardData?.coCurricular || [];
  const coCounts = ["Certificate", "Project", "Sports"].map((c) => ({
    title: c,
    count: co.filter((x) => (x?.category || "").toLowerCase() === c.toLowerCase())
      .length,
  }));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logo} style={styles.logo} />
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Report Card</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.subMuted}>Academic Year</Text>
            <Text style={styles.subBold}>Session 2024-25</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoGrid}>
            <InfoItem
              icon={profileIcon}
              label="Full Name"
              value={`${studentData?.firstName || ""} ${studentData?.lastName || ""}`.trim() || "N/A"}
            />
            <InfoItem icon={mailIcon} label="Email" value={studentData?.email} />
            <InfoItem icon={contactIcon} label="Contact Number" value={studentData?.studentMobile} />
            <InfoItem icon={courseIcon} label="Course" value={studentData?.course} />
            <InfoItem icon={fatherIcon} label="Father's Name" value={studentData?.fatherName} />
            <InfoItem icon={addressIcon} label="Track" value={`Level ${studentData?.track || "1A"}`} />
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Level Progress</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={[styles.value, { fontSize: 11 }]}>
              Current Level: <Text style={{ fontWeight: "bold", color: "#F59E0B" }}>Level {studentData?.currentLevel || "1A"}</Text>
            </Text>
            <Text style={[styles.small, { color: "#6B7280" }]}>
              Progress: {Math.round(((LEVEL_STEPS.findIndex(s => s === (studentData?.currentLevel || "1A")) + 1) / LEVEL_STEPS.length) * 100)}% Complete
            </Text>
          </View>
          <LevelTimeline currentLevel={studentData?.currentLevel || "1A"} />
        </View>

        {/* ======= CUSTOM TWO-COLUMN SECTION (28% | 68% with stacked rows on right) ======= */}
        <View style={styles.mainRow}>
          {/* LEFT: 28% - Technical Skills */}
          <View style={styles.leftCol30}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {(technicalSkills.length ? technicalSkills : [{ name: "N/A", percent: 0 }]).map(
              (s, i) => (
                <View key={i} style={styles.skillRow}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.small}>{s.name}</Text>
                    <Text style={styles.small}>{s.percent}%</Text>
                  </View>
                  <ProgressBar percent={s.percent} />
                </View>
              )
            )}
          </View>

          {/* RIGHT: 68% - Top row: Soft + Discipline side-by-side; Bottom row: Co-curricular cards */}
          <View style={styles.rightCol60}>
            {/* Top half: Soft Skills + Discipline */}
            <View style={styles.rightTopRow}>
              <View style={[styles.rightTopCol, styles.rightTopColLeftGap]}>
                <Text style={styles.sectionTitle}>Soft Skills</Text>
                {softCats.length ? (
                  softCats.map((c, i) => (
                    <SoftItem
                      key={i}
                      title={c?.title || "Skill"}
                      status={softStatus(c?.score, c?.maxMarks)}
                    />
                  ))
                ) : (
                  <Text style={styles.small}>N/A</Text>
                )}
              </View>

              <View style={styles.rightTopCol}>
                <Text style={styles.sectionTitle}>Discipline</Text>
                {discCats.length ? (
                  discCats.map((c, i) => {
                    const pct = ((Number(c?.score || 0) / Number(c?.maxMarks || 10)) * 100) || 0;
                    return (
                      <View key={i} style={styles.skillRow}>
                        <View style={styles.skillHeader}>
                          <Text style={styles.small}>{c?.title || "Metric"}</Text>
                          <Text style={styles.small}>
                            {c?.score}/{c?.maxMarks}
                          </Text>
                        </View>
                        <ProgressBar percent={pct} />
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.small}>N/A</Text>
                )}
              </View>
            </View>

            {/* Bottom half: Co-curricular heading + cards */}
            <View style={styles.rightBottomRow}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Co-Curricular Activities</Text>
                <View style={styles.coCardsWrap}>
                  {coCounts.map((c) => (
                    <View key={c.title} style={styles.coCard}>
                      <Text style={styles.coCardTitle}>{c.title}</Text>
                      <Text style={styles.coCardCount}>{c.count}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Career Readiness */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Readiness</Text>
          <View style={styles.readinessRow}>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>Resume</Text>
              <Text style={styles.pillValue}>
                {reportCardData?.careerReadiness?.resumeStatus || "Not created"}
              </Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>LinkedIn</Text>
              <Text style={styles.pillValue}>
                {reportCardData?.careerReadiness?.linkedinStatus || "Need to improve"}
              </Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>Aptitude</Text>
              <Text style={styles.pillValue}>
                {reportCardData?.careerReadiness?.aptitudeStatus || "In-progress"}
              </Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>Placement</Text>
              <Text style={styles.pillValue}>
                {reportCardData?.careerReadiness?.placementReady || "Not-ready"}
              </Text>
            </View>
          </View>
        </View>

        {/* Academic Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Performance</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {[
              { title: "Current Level", val: `Level ${studentData?.currentLevel || "1A"}` },
              { title: "1st Year SGPA", val: reportCardData?.academicPerformance?.yearWiseSGPA?.find(y => y.year === "FY")?.sgpa ?? "N/A" },
              { title: "2nd Year SGPA", val: reportCardData?.academicPerformance?.yearWiseSGPA?.find(y => y.year === "SY")?.sgpa ?? "N/A" },
              { title: "3rd Year SGPA", val: reportCardData?.academicPerformance?.yearWiseSGPA?.find(y => y.year === "TY")?.sgpa ?? "N/A" },
              { title: "CGPA", val: reportCardData?.academicPerformance?.cgpa ?? "N/A" },
            ].map((it, idx) => (
              <View
                key={idx}
                style={{
                  width: "19.2%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 6,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#E5E7EB",
                  paddingVertical: 8,
                  paddingHorizontal: 6,
                }}
              >
                <Text style={{ fontSize: 9, color: "#6B7280", textAlign: "center", marginBottom: 4 }}>
                  {it.title}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", color: "#111827" }}>
                  {it.val}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Faculty Feedback */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faculty Feedback</Text>
          <Text style={styles.value}>
            {reportCardData?.facultyRemark || "No feedback available"}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 8, gap: 12 }}>
            <Text style={styles.label}>
              Rating:{" "}
              <Text style={styles.value}>
                {(() => {
                  const g = (reportCardData?.overallGrade || "").toUpperCase();
                  if (g === "A+") return "5.0";
                  if (g === "A") return "4.5";
                  if (g === "B+") return "4.0";
                  if (g === "B") return "3.5";
                  if (g === "C+") return "3.0";
                  if (g === "C") return "2.5";
                  if (g === "D+") return "2.0";
                  if (g === "D") return "1.5";
                  if (g === "F") return "1.0";
                  return "3.0";
                })()} ★
              </Text>
            </Text>

            <Text style={styles.label}>
              Generated by:{" "}
              <Text style={styles.value}>
                {reportCardData?.generatedByName || "N/A"}
              </Text>
            </Text>
          </View>
        </View> */}

        {/* Footer */}
   <View style={styles.footer} fixed>
  <View style={styles.footerColumn}>
    <Text style={styles.footerHeading}>Final Status</Text>
    <Text style={styles.footerValue}>
      {reportCardData?.finalStatus || "Level 2A"}
    </Text>
  </View>

  <View style={styles.footerColumn}>
    <Text style={styles.footerHeading}>Result</Text>
    <Text style={styles.footerValue}>
      {reportCardData?.result || "2A"}
    </Text>
  </View>

  <View style={styles.footerColumn}>
    <Text style={styles.footerHeading}>Overall Grade</Text>
    <Text style={styles.footerValue}>
      {reportCardData?.overallGrade || "A"}
    </Text>
  </View>
</View>


      </Page>
    </Document>
  );
};

export default StudentReportPDF;

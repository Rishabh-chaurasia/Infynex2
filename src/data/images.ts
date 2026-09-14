import hardware from '../assets/india/hardware.webp'
import infra from '../assets/india/it-infra-services.webp'
import duct from '../assets/india/robotic-duct-cleaning.webp'
import solar from '../assets/india/solar-system-services.webp'
import operations from '../assets/india/why-operations.webp'
import handover from '../assets/india/service-handover.webp'
import planning from '../assets/india/infrastructure-planning.webp'
import rollout from '../assets/india/hardware-rollout.webp'
import leadership from '../assets/india/about-leadership.webp'
import infrastructureHome from '../assets/india/infrastructure-home-v2.webp'
import solarInspection from '../assets/india/solar-inspection-v2.webp'
import hwDesktops from '../assets/generated-services/hw-desktops.webp'
import hwServers from '../assets/generated-services/hw-servers.webp'
import hwNetwork from '../assets/generated-services/hw-network.webp'
import hwPeripherals from '../assets/generated-services/hw-peripherals.webp'
import hwUpgrades from '../assets/generated-services/hw-upgrades.webp'
import hwCabling from '../assets/generated-services/hw-cabling.webp'
import helpdeskAgent from '../assets/generated-services/helpdesk-agent.webp'
import helpdeskTeam from '../assets/generated-services/helpdesk-team.webp'
import supportOnsite from '../assets/generated-services/support-onsite.webp'
import supportResident from '../assets/generated-services/support-resident.webp'
import teleAgentNew from '../assets/generated-services/tele-agent.webp'
import teleServicesTeam from '../assets/generated-services/tele-services-team-v2.webp'
import teleManager from '../assets/generated-services/tele-manager.webp'
import infraAssess from '../assets/generated-services/infra-assess.webp'
import infraNetworkTeam from '../assets/generated-services/infra-network-team-v2.webp'
import cloudArchitecture from '../assets/generated-services/cloud-architecture.webp'
import cloudStorage from '../assets/generated-services/cloud-storage.webp'
import ductRobotNew from '../assets/generated-services/duct-robot.webp'
import ductCleaningTeam from '../assets/generated-services/duct-cleaning-team-v2.webp'
import ductOperator from '../assets/generated-services/duct-operator.webp'
import ductCamera from '../assets/generated-services/duct-camera.webp'
import solarSurvey from '../assets/generated-services/solar-survey.webp'
import solarInverter from '../assets/generated-services/solar-inverter.webp'
import b2bMeetingNew from '../assets/generated-services/b2b-meeting.webp'
import b2cAdvisor from '../assets/generated-services/b2c-advisor.webp'
import aboutStrategy from '../assets/generated-services/about-strategy.webp'
import aboutTeamNew from '../assets/generated-services/about-team.webp'
import aboutPlanning from '../assets/generated-services/about-planning.webp'
import aboutHandover from '../assets/generated-services/about-handover.webp'
import amcMaintainNew from '../assets/generated-services/amc-maintain.webp'
import amcRackNew from '../assets/generated-services/amc-rack.webp'
import amcAuditNew from '../assets/generated-services/amc-audit.webp'
import amcReportNew from '../assets/generated-services/amc-report.webp'
import vehicleSupplyHero from '../assets/generated-services/vehicle-supply-hero-v2.webp'
import vehicleOps from '../assets/generated-services/vehicle-ops.webp'
import vehicleHandover from '../assets/generated-services/vehicle-handover.webp'
import vehicleShuttle from '../assets/generated-services/vehicle-shuttle.webp'
import blogDuct from '../assets/india/duct-cleaning-context.jpg'
import blogMaintenance from '../assets/blog-real/it-maintenance.jpg'
import blogSolar from '../assets/blog-real/solar-installation.jpg'
import blogSupport from '../assets/blog-real/it-support.jpg'
import blogCloud from '../assets/blog-real/cloud-server.jpg'
import blogHardware from '../assets/blog-real/office-hardware.jpg'

/**
 * Local, content-reviewed imagery. People shown in workplace and field-service
 * scenes are Indian; equipment-only images remain tied to the relevant service.
 */
export const images = {
  // Home / brand
  heroMain: infra,
  heroSide: rollout,
  heroSmall: planning,
  capabilities: operations,
  infrastructure: infrastructureHome,
  office: leadership,
  team: operations,
  meeting: handover,
  building: handover,
  workspace: planning,
  desk: rollout,
  aboutHeroTeam: aboutStrategy,
  aboutHeroService: aboutTeamNew,
  aboutPrinciples: aboutPlanning,
  aboutLeadership: aboutHandover,
  aboutCta: aboutTeamNew,

  // AMC
  amcHero: amcMaintainNew,
  amcTech: amcAuditNew,
  amcRack: amcRackNew,
  amcDesk: amcReportNew,

  // Hardware
  hwHero: hwDesktops,
  hwBoard: hwServers,
  hwPc: hwPeripherals,
  hwLaptop: hwDesktops,
  hwCables: hwCabling,
  hwDesktops,
  hwServers,
  hwNetwork,
  hwPeripherals,
  hwUpgrades,
  hwCabling,

  // IT infrastructure
  infraHero: infraAssess,
  infraRack: infraNetworkTeam,
  infraDc: cloudArchitecture,
  infraCables: hwCabling,

  // Cloud
  cloudHero: cloudArchitecture,
  cloudDc: cloudStorage,
  cloudRack: infraAssess,
  cloudCode: cloudArchitecture,

  // Tele services
  teleHero: teleServicesTeam,
  teleAgent: teleAgentNew,
  teleTeam: teleManager,
  teleAntenna: helpdeskTeam,

  // Robotic duct cleaning
  ductHero: ductRobotNew,
  ductRobot: ductCleaningTeam,
  ductIndustrial: ductOperator,
  ductInspection: ductCamera,
  ductPipes: duct,

  // Technical support
  tsHero: supportOnsite,
  tsOffice: supportResident,
  tsFix: supportOnsite,
  tsDesk: hwDesktops,

  // Helpdesk
  hdHero: helpdeskAgent,
  hdTeam: helpdeskTeam,
  hdAgent: helpdeskAgent,
  hdScreen: teleManager,

  // Vehicle vendor
  vvHero: vehicleSupplyHero,
  vvCar: vehicleHandover,
  vvRoad: vehicleOps,
  vvFleet: vehicleShuttle,

  // Solar
  solarHero: solarSurvey,
  solarField: solar,
  solarInstall: solarInverter,
  solarRoof: solarInspection,

  // B2B / B2C
  b2bHero: b2bMeetingNew,
  b2bMeeting: b2bMeetingNew,
  b2bOffice: aboutStrategy,
  b2cHero: b2cAdvisor,
  b2cStore: hardware,
  b2cPeople: b2cAdvisor,

  // Blog
  blog1: blogMaintenance,
  blog2: blogDuct,
  blog3: blogSolar,
  blog4: blogSupport,
  blog5: blogCloud,
  blog6: blogHardware,
}

export type ImageKey = keyof typeof images

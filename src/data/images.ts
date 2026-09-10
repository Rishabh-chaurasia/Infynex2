/**
 * Image registry.
 * Photography is sourced from Unsplash (royalty‑free) and used as illustrative
 * imagery only — it does NOT depict Infynex projects, staff or clients.
 * Replace any entry with real company photography by pointing it at /public/... paths.
 *
 * Every image is rendered through <SmartImage>, which falls back to a generated
 * abstract visual if a remote asset cannot be loaded.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // Home / brand
  heroMain: u('1558494949-ef010cbdcc31', 2000), // server corridor
  heroSide: u('1581091226825-a6a2a5aee158', 1200), // engineer at work
  heroSmall: u('1544197150-b99a580bb7a8', 900), // network cabling
  capabilities: u('1451187580459-43490279c0fa', 1800), // global network
  infrastructure: u('1597852074816-d933c7d2b988', 1800), // rack detail
  office: u('1497366216548-37526070297c', 1600),
  team: u('1522071820081-009f0129c71c', 1600),
  meeting: u('1556761175-5973dc0f32e7', 1600),
  building: u('1486406146926-c627a92ad1ab', 1600),
  workspace: u('1497215728101-856f4ea42174', 1600),
  desk: u('1519389950473-47ba0277781c', 1600),

  // AMC
  amcHero: u('1581092160562-40aa08e78837', 2000),
  amcTech: u('1581091870622-1e7b5b1a1d7d', 1200),
  amcRack: u('1603791440384-56cd371ee9a7', 1200),
  amcDesk: u('1504384308090-c894fdcc538d', 1200),

  // Hardware
  hwHero: u('1591405351990-4726e331f141', 2000),
  hwBoard: u('1518770660439-4636190af475', 1400),
  hwPc: u('1597872200969-2b65d56bd16b', 1200),
  hwLaptop: u('1484807352052-23338990c6c6', 1200),
  hwCables: u('1544197150-b99a580bb7a8', 1200),

  // IT Infra
  infraHero: u('1558494949-ef010cbdcc31', 2000),
  infraRack: u('1520869562399-e772f042f422', 1400),
  infraDc: u('1610563166150-b34df4f3bcd6', 1400),
  infraCables: u('1603791440384-56cd371ee9a7', 1200),

  // Cloud
  cloudHero: u('1451187580459-43490279c0fa', 2000),
  cloudDc: u('1597852074816-d933c7d2b988', 1400),
  cloudRack: u('1520869562399-e772f042f422', 1200),
  cloudCode: u('1487058792275-0ad4aaf24ca7', 1200),

  // Tele
  teleHero: u('1483478550801-ceba5fe50e8e', 2000), // telecom tower
  teleAgent: u('1553028826-f4804a6dba3b', 1400),
  teleTeam: u('1598257006458-087169a1f08d', 1400),
  teleAntenna: u('1516044734145-07ca8eef8731', 1200),

  // Robotic duct
  ductHero: u('1485827404703-89b55fcc595e', 2000), // robot
  ductRobot: u('1535378620166-273708d44e4c', 1400),
  ductIndustrial: u('1565043666747-69f6646db940', 1400),
  ductInspection: u('1581094794329-c8112a89af12', 1400),
  ductPipes: u('1504328345606-18bbc8c9d7d1', 1200),

  // Technical support
  tsHero: u('1581092160562-40aa08e78837', 2000),
  tsOffice: u('1497366811353-6870744d04b2', 1400),
  tsFix: u('1581091226825-a6a2a5aee158', 1400),
  tsDesk: u('1531482615713-2afd69097998', 1200),

  // Helpdesk
  hdHero: u('1553028826-f4804a6dba3b', 2000),
  hdTeam: u('1516321318423-f06f85e504b3', 1400),
  hdAgent: u('1544717305-2782549b5136', 1400),
  hdScreen: u('1587560699334-cc4ff634909a', 1200),

  // Vehicle vendor
  vvHero: u('1449824913935-59a10b8d2000', 2000), // city road
  vvCar: u('1503376780353-7e6692767b70', 1400),
  vvRoad: u('1568605117036-5fe5e7bab0b7', 1400),
  vvFleet: u('1494976388531-d1058494cdd8', 1200),

  // Solar
  solarHero: u('1509391366360-2e959784a276', 2000),
  solarField: u('1466611653911-95081537e5b7', 1600),
  solarInstall: u('1508514177221-188b1cf16e9d', 1400),
  solarRoof: u('1497440001374-f26997328c1b', 1200),

  // B2B / B2C
  b2bHero: u('1542744173-8e7e53415bb0', 2000),
  b2bMeeting: u('1560264280-88b68371db39', 1400),
  b2bOffice: u('1454165804606-c3d57bc86b40', 1200),
  b2cHero: u('1556742049-0cfed4f6a45d', 2000),
  b2cStore: u('1556740758-90de374c12ad', 1400),
  b2cPeople: u('1521737604893-d14cc237f11d', 1200),

  // Blog
  blog1: u('1518770660439-4636190af475', 1400),
  blog2: u('1509391366360-2e959784a276', 1400),
  blog3: u('1485827404703-89b55fcc595e', 1400),
  blog4: u('1553028826-f4804a6dba3b', 1400),
  blog5: u('1451187580459-43490279c0fa', 1400),
  blog6: u('1581092160562-40aa08e78837', 1400),
}

export type ImageKey = keyof typeof images

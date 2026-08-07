import type { SVGProps } from "react";

/**
 * Ultra-thin laser-cut outline icons. 24px grid, 1px stroke, no fills,
 * butt caps, miter joins. Every terminal lands on a whole or half unit.
 */

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* --- Documents & plans ---------------------------------------------------- */

export const IconSheet = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 2.75h9.5L19 7.25V21.25H5V2.75Z" />
    <path d="M14.25 2.75V7.5H19" />
    <path d="M8 12h8M8 15h8M8 18h5" />
  </Icon>
);

export const IconPlanSet = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 6.75h13.5v13.5H2.75V6.75Z" />
    <path d="M6 3.75h15.25v13.5" />
    <path d="M2.75 11.25h13.5M7.75 6.75v13.5" />
  </Icon>
);

export const IconUpload = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 16.5V3.5" />
    <path d="M6.5 9 12 3.5 17.5 9" />
    <path d="M3.5 15.5v5h17v-5" />
  </Icon>
);

export const IconDownload = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5v13" />
    <path d="M6.5 11 12 16.5 17.5 11" />
    <path d="M3.5 15.5v5h17v-5" />
  </Icon>
);

export const IconLayers = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.75 21.25 8 12 13.25 2.75 8 12 2.75Z" />
    <path d="m4.75 12 7.25 4.25L19.25 12" />
    <path d="m4.75 16 7.25 4.25L19.25 16" />
  </Icon>
);

export const IconRuler = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 8.75h18.5v6.5H2.75v-6.5Z" />
    <path d="M6.5 8.75v3M10 8.75v4.5M13.5 8.75v3M17 8.75v4.5" />
  </Icon>
);

export const IconGrid = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 3.75h16.5v16.5H3.75V3.75Z" />
    <path d="M9.25 3.75v16.5M14.75 3.75v16.5M3.75 9.25h16.5M3.75 14.75h16.5" />
  </Icon>
);

export const IconCrosshair = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 3.75h16.5v16.5H3.75V3.75Z" />
    <path d="M12 6.75v10.5M6.75 12h10.5" />
  </Icon>
);

/* --- Compliance & regulatory ---------------------------------------------- */

export const IconStamp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.25 3.75h7.5v5l-1.5 3.5h-4.5l-1.5-3.5v-5Z" />
    <path d="M3.75 16.25h16.5v4H3.75v-4Z" />
    <path d="M6.75 16.25v-4h10.5v4" />
  </Icon>
);

export const IconShieldCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.75 20.25 5.5v6.25c0 4.5-3.5 7.5-8.25 9.5-4.75-2-8.25-5-8.25-9.5V5.5L12 2.75Z" />
    <path d="m8.25 11.75 2.75 2.75 5-5" />
  </Icon>
);

export const IconGavel = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 20.25h9.5" />
    <path d="m6.75 13.5 5.25-5.25 3.75 3.75-5.25 5.25-3.75-3.75Z" />
    <path d="m13.5 2.75 7.75 7.75-2.5 2.5L11 5.25l2.5-2.5Z" />
  </Icon>
);

export const IconRadar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25" />
    <path d="M12 7.75a4.25 4.25 0 1 0 4.25 4.25" />
    <path d="M12 12 20.25 3.75" />
    <path d="M17.5 3.75h2.75V6.5" />
  </Icon>
);

export const IconCodeBook = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.75 3.75h14.5v16.5H4.75V3.75Z" />
    <path d="M8.25 3.75v16.5" />
    <path d="m13 9.5-1.75 2.5L13 14.5M16 9.5l1.75 2.5L16 14.5" />
  </Icon>
);

export const IconAlertTriangle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.25 21.5 20.25h-19L12 3.25Z" />
    <path d="M12 9.5v5M12 17.25v.75" />
  </Icon>
);

export const IconClipboard = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.75 4.75H4.75v16.5h14.5V4.75h-4" />
    <path d="M9.25 2.75h5.5v4h-5.5v-4Z" />
    <path d="M8.5 11.5h7M8.5 15h7" />
  </Icon>
);

/* --- Marketplace & people ------------------------------------------------- */

export const IconHardHat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.25 16.25h17.5v3H3.25v-3Z" />
    <path d="M5.75 16.25v-3a6.25 6.25 0 0 1 12.5 0v3" />
    <path d="M9.75 7.5V4.25h4.5V7.5" />
  </Icon>
);

export const IconBuilding = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.75 20.25V3.75h10.5v16.5" />
    <path d="M15.25 9.25h4v11" />
    <path d="M7.75 7.25h4.5M7.75 11.25h4.5M7.75 15.25h4.5" />
    <path d="M2.75 20.25h18.5" />
  </Icon>
);

export const IconUsers = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
    <path d="M2.75 20.25v-2.5a4.25 4.25 0 0 1 4.25-4.25h4a4.25 4.25 0 0 1 4.25 4.25v2.5" />
    <path d="M16.5 4.25a3.25 3.25 0 0 1 0 5.75" />
    <path d="M18 13.75a4.25 4.25 0 0 1 3.25 4v2.5" />
  </Icon>
);

export const IconUser = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.75a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z" />
    <path d="M4.75 20.25v-2a4.5 4.5 0 0 1 4.5-4.5h5.5a4.5 4.5 0 0 1 4.5 4.5v2" />
  </Icon>
);

export const IconGavelBid = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 20.25h16.5" />
    <path d="M6.75 17.25V9.5l5.25-4.75L17.25 9.5v7.75" />
    <path d="M10.25 17.25v-4h3.5v4" />
  </Icon>
);

export const IconDollar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.75v18.5" />
    <path d="M16.25 7.25A3.5 3.5 0 0 0 12.75 5h-1.5a3 3 0 0 0 0 6h1.5a3 3 0 0 1 0 6h-1.5a3.5 3.5 0 0 1-3.5-2.25" />
  </Icon>
);

export const IconChart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 3.75v16.5h16.5" />
    <path d="M7.25 16.5v-4M11.25 16.5V8.5M15.25 16.5v-6M19.25 16.5v-9" />
  </Icon>
);

/* --- Trades ---------------------------------------------------------------- */

export const IconBolt = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13.5 2.75 5.75 13.5h5.25l-.5 7.75 7.75-10.75H13l.5-7.75Z" />
  </Icon>
);

export const IconPipe = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 7.75h6.5v8.5h-6.5" />
    <path d="M10.25 4.75h3.5v14.5h-3.5" />
    <path d="M13.75 7.75h6.5v8.5h-6.5" />
  </Icon>
);

export const IconHvac = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 4.75h16.5v14.5H3.75V4.75Z" />
    <path d="M3.75 9h16.5M3.75 13h16.5M3.75 17h16.5" />
  </Icon>
);

export const IconConcrete = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 8.75h18.5v10.5H2.75V8.75Z" />
    <path d="M2.75 14h18.5M8.5 8.75V14M15 14v5.25M11.75 14v5.25" />
  </Icon>
);

/* --- System / UI ----------------------------------------------------------- */

export const IconSearch = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10.75 3.75a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" />
    <path d="m15.75 15.75 4.5 4.5" />
  </Icon>
);

export const IconBell = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.25 10a5.75 5.75 0 0 1 11.5 0v5l2 2.75H4.25l2-2.75v-5Z" />
    <path d="M10 20.25h4" />
  </Icon>
);

export const IconPlus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4.5v15M4.5 12h15" />
  </Icon>
);

export const IconMinus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12h15" />
  </Icon>
);

export const IconX = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Icon>
);

export const IconCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Icon>
);

export const IconChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 4.5 7.5 7.5L9 19.5" />
  </Icon>
);

export const IconChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 4.5 7.5 12 15 19.5" />
  </Icon>
);

export const IconChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 9 12 16.5 19.5 9" />
  </Icon>
);

export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 12h16.5" />
    <path d="m14.5 6.25 5.75 5.75-5.75 5.75" />
  </Icon>
);

export const IconEye = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.25 12S6 5.75 12 5.75 21.75 12 21.75 12 18 18.25 12 18.25 2.25 12 2.25 12Z" />
    <path d="M12 8.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
  </Icon>
);

export const IconEdit = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.75 15.5 15.5 4.75l3.75 3.75L8.5 19.25l-4.75 1 1-4.75Z" />
    <path d="m13 7.25 3.75 3.75" />
  </Icon>
);

export const IconTrash = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.75 6.25h14.5" />
    <path d="M6.75 6.25v14h10.5v-14" />
    <path d="M9.5 6.25v-2.5h5v2.5M10 10v6.5M14 10v6.5" />
  </Icon>
);

export const IconFilter = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 4.75h18.5L14 12.5v6.75l-4 2v-8.75L2.75 4.75Z" />
  </Icon>
);

export const IconClock = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Z" />
    <path d="M12 7v5.25l3.5 2" />
  </Icon>
);

export const IconCalendar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 5.75h16.5v14.5H3.75V5.75Z" />
    <path d="M3.75 10h16.5M8 3.5v4M16 3.5v4" />
  </Icon>
);

export const IconMapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.75c3.5 0 6.25 2.75 6.25 6.25 0 4.5-6.25 12-6.25 12S5.75 13.5 5.75 9c0-3.5 2.75-6.25 6.25-6.25Z" />
    <path d="M12 6.75a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
  </Icon>
);

export const IconLink = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10 13.5a4 4 0 0 0 5.5.25l3-3a4 4 0 0 0-5.5-5.75l-1.5 1.5" />
    <path d="M14 10.5a4 4 0 0 0-5.5-.25l-3 3a4 4 0 0 0 5.5 5.75l1.5-1.5" />
  </Icon>
);

export const IconExternal = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13 4.75h6.25V11" />
    <path d="m19.25 4.75-8.5 8.5" />
    <path d="M17 14v5.25H4.75V7h5.5" />
  </Icon>
);

export const IconLock = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.75 10.75h14.5v9.5H4.75v-9.5Z" />
    <path d="M7.75 10.75V7.5a4.25 4.25 0 0 1 8.5 0v3.25" />
  </Icon>
);

export const IconSettings = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 8.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
    <path d="M12 2.75h-.01L11 5.25l-2.5 1L6.25 5 5 6.25l1.25 2.25-1 2.5L2.75 12v.01l2.5 1 1 2.5L5 17.75 6.25 19l2.25-1.25 2.5 1 .99 2.5H12l1-2.5 2.5-1L17.75 19 19 17.75l-1.25-2.25 1-2.5 2.5-.99V12l-2.5-1-1-2.5L19 6.25 17.75 5l-2.25 1.25-2.5-1L12 2.75Z" />
  </Icon>
);

export const IconLogout = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.75 4.75H4.75v14.5h5" />
    <path d="M13 8.25 16.75 12 13 15.75" />
    <path d="M16.75 12H8.5" />
  </Icon>
);

export const IconMenu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 6.5h16.5M3.75 12h16.5M3.75 17.5h16.5" />
  </Icon>
);

export const IconCamera = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 7.25h4l1.5-2.5h7.5l1.5 2.5h4v12H2.75v-12Z" />
    <path d="M12 9.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z" />
  </Icon>
);

export const IconMessage = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 4.75h16.5v12h-10l-4.5 3.5v-3.5h-2v-12Z" />
    <path d="M8 9h8M8 12.5h5" />
  </Icon>
);

export const IconInfo = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Z" />
    <path d="M12 10.75v6M12 7v.75" />
  </Icon>
);

export const IconBarcode = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.25 5v14M6 5v14M8.75 5v10M11.5 5v14M15.25 5v10M18 5v14M20.75 5v14" />
  </Icon>
);

export const IconRefresh = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.25 12a8.25 8.25 0 1 1-2.5-5.9" />
    <path d="M20.25 3.75V8.5h-4.75" />
  </Icon>
);

export const ICON_INDEX = {
  IconSheet,
  IconPlanSet,
  IconUpload,
  IconDownload,
  IconLayers,
  IconRuler,
  IconGrid,
  IconCrosshair,
  IconStamp,
  IconShieldCheck,
  IconGavel,
  IconRadar,
  IconCodeBook,
  IconAlertTriangle,
  IconClipboard,
  IconHardHat,
  IconBuilding,
  IconUsers,
  IconUser,
  IconGavelBid,
  IconDollar,
  IconChart,
  IconBolt,
  IconPipe,
  IconHvac,
  IconConcrete,
  IconSearch,
  IconBell,
  IconPlus,
  IconMinus,
  IconX,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconChevronDown,
  IconArrowRight,
  IconEye,
  IconEdit,
  IconTrash,
  IconFilter,
  IconClock,
  IconCalendar,
  IconMapPin,
  IconLink,
  IconExternal,
  IconLock,
  IconSettings,
  IconLogout,
  IconMenu,
  IconCamera,
  IconMessage,
  IconInfo,
  IconBarcode,
  IconRefresh,
} as const;

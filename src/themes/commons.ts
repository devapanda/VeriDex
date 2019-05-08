export interface Theme {
    componentsTheme: ThemeProperties;
    modalTheme: ThemeModalStyle;
}

export interface ThemeProperties {
    background: string;
    borderColor: string;
    boxShadow: string;
    buttonConvertBackgroundColor: string;
    buttonConvertBorderColor: string;
    buttonConvertTextColor: string;
    buttonErrorBackgroundColor: string;
    buttonPrimaryBackgroundColor: string;
    buttonSecondaryBackgroundColor: string;
    buttonTertiaryBackgroundColor: string;
    cardBackgroundColor: string;
    cardBorderColor: string;
    cardTitleColor: string;
    darkBlue: string;
    darkGray: string;
    darkerGray: string;
    dropdownBackgroundColor: string;
    dropdownBorderColor: string;
    dropdownTextColor: string;
    errorButtonBackground: string;
    errorCardBackground: string;
    errorCardBorder: string;
    errorCardText: string;
    ethBoxActiveColor: string;
    ethBoxBorderColor: string;
    ethSetMinEthButtonBorderColor: string;
    ethSliderThumbColor: string;
    ethSliderThumbBorderColor: string;
    gray: string;
    green: string;
    iconLockedColor: string;
    iconUnlockedColor: string;
    inactiveTabBackgroundColor: string;
    lightGray: string;
    logoColor: string;
    logoTextColor: string;
    marketsSearchFieldBackgroundColor: string;
    marketsSearchFieldBorderColor: string;
    marketsSearchFieldTextColor: string;
    notificationActive: string;
    notificationIconColor: string;
    notificationsBadgeColor: string;
    numberDecimalsColor: string;
    orange: string;
    rowActive: string;
    tableBorderColor: string;
    tdColor: string;
    textColorCommon: string;
    textDark: string;
    textInputBackgroundColor: string;
    textInputBorderColor: string;
    textInputTextColor: string;
    textLight: string;
    textLighter: string;
    thColor: string;
    topbarBackgroundColor: string;
    topbarBorderColor: string;
    topbarSeparatorColor: string;
    stepsProgressStartingDotColor: string;
    stepsProgressStepTitleColor: string;
    stepsProgressStepTitleColorActive: string;
    stepsProgressStepLineColor: string;
    stepsProgressStepLineProgressColor: string;
    stepsProgressCheckMarkColor: string;
    buttonTextColor: string;
}

export interface ThemeModalStyle {
    content: {
        backgroundColor: string;
        bottom: string;
        borderColor: string;
        flexGrow: string;
        left: string;
        minWidth: string;
        position: string;
        right: string;
        top: string;
    };
    overlay: {
        alignItems: string;
        backgroundColor: string;
        display: string;
        justifyContent: string;
        zIndex: string;
    };
}

export interface ThemeMetaData {
    name: string;
    theme: Theme;
}

export const themeDimensions = {
    borderRadius: '4px',
    fieldHeight: '46px',
    horizontalPadding: '16px',
    sidebarWidth: '350px',
    verticalPadding: '10px',
    verticalSeparation: '30px',
};

export const themeBreakPoints = {
    lg: '992px',
    md: '768px',
    sm: '480px',
    xl: '1024px',
    xs: '320px',
    xxl: '1280px',
    xxxl: '1366px',
};

export const themeFeatures = {
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
};

export enum SpinnerSize {
    Small = '26px',
    Medium = '52px',
}

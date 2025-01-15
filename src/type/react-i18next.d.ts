import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "Billing";
    resources: {
      Billing: {
        welcome: string;
        description: string;
        billingInformation: string;
        billingDescription: string;
        fullName: string;
        email: string;
        companyOptional: string;
        euVat: string;
        save: string;
      };
    };
  }
}

import React from "react";

interface PageTitleBarProps {
  title: string;
  subtitle: string;
  IconPath: string;
}

const PageTitleBar: React.FC<PageTitleBarProps> = ({
  title,
  subtitle,
  IconPath,
}) => {
  return (
    <div className="flex items-start justify-center gap-4">
      <img width={"50px"} height={"80px"} src={IconPath} />
      <div className="flex flex-col">
        <h1 className="font-bold text-brPrimary text-2xl">{title}</h1>
        <p className="text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageTitleBar;

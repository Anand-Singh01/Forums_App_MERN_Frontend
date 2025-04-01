import React from "react";
interface modal {
  isVisible: boolean;
  Component: React.FC | null;
}
const ModalManager: React.FC<modal> = ({ isVisible, Component }) => {
  if (!isVisible || !Component) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="fixed inset-0 w-full bg-gray-300 opacity-80 z-50" />
      <div className="fixed inset-0 w-full flex items-center justify-center z-50">
        <Component />
      </div>
    </section>
  );
};

export default ModalManager;

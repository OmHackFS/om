import { ConnectWalletButton } from "./ConnectWalletButton";

export const ConnectWalletScreen = ({ onConnect }: any) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <ConnectWalletButton onConnect={onConnect} />
    </div>
  );
};

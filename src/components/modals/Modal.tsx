interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}
export const Modal = ({ isOpen, onClose, onDelete, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="p-6 bg-gray-500 rounded-lg shadow-lg w-96">
        {children}
        <div className="flex flex-row items-center gap-4 justify-end mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onDelete}
            className="items-center flex px-2 py-1 rounded-md bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

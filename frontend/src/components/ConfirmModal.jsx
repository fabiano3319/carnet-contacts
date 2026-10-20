import { useEffect, useRef } from 'react'

function ConfirmModal({
  ouvert,
  titre,
  message,
  confirmLabel = 'Supprimer',
  chargement = false,
  onConfirm,
  onCancel,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (ouvert && !dialog.open) dialog.showModal()
    if (!ouvert && dialog.open) dialog.close()
  }, [ouvert])

  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={e => { e.preventDefault(); onCancel() }}
      onClick={e => { if (e.target === ref.current) onCancel() }}
    >
      <div className="modal-body">
        <h3>{titre}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel} autoFocus>
            Annuler
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={chargement}>
            {chargement ? 'Suppression...' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmModal
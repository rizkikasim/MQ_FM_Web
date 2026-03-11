import { useCallback, memo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import EventForm from "../../features/event/ui/EventForm";
import { useEventMutations } from "../../features/event/model/useEventMutations";
import { getEventImageUrl } from "../../entities/event";

const EventEditPage = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { update, extractError } = useEventMutations();
  const evt = state?.event;

  const handleSubmit = useCallback(async (data) => {
    try {
      await update.mutateAsync({ id, data });
      navigate("/admin/event");
    } catch (_) {}
  }, [update, id, navigate]);

  return (
    <AdminLayout>
      <EventForm title="Edit Event" initialData={evt} existingImage={getEventImageUrl(evt?.image)} isLoading={update.isPending} error={extractError(update.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default EventEditPage;

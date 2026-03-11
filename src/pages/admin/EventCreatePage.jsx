import { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import EventForm from "../../features/event/ui/EventForm";
import { useEventMutations } from "../../features/event/model/useEventMutations";

const EventCreatePage = memo(() => {
  const navigate = useNavigate();
  const { create, extractError } = useEventMutations();

  const handleSubmit = useCallback(async (data) => {
    try {
      await create.mutateAsync(data);
      navigate("/admin/event");
    } catch (_) {}
  }, [create, navigate]);

  return (
    <AdminLayout>
      <EventForm title="Add New Event" isLoading={create.isPending} error={extractError(create.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default EventCreatePage;

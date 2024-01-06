import supabaseClient from "./supabase";

export const getTodos = async ({
  userId,
  supabaseAccessToken,
}: {
  userId: String;
  supabaseAccessToken: String;
}) => {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return todos;
};

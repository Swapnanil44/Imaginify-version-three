
import { redirect } from "next/navigation";
import Header from "@/components/header";
import TransformationForm from "@/components/transformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async ({params}:{params:{id: string}}) => {
  const { id } = await params
  const session = await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) redirect("/sign-in");
  const userId = session?.user.id;

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user.id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;
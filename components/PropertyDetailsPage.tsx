import { editPropertyProps } from "@/app/dashboard/properties/[propertyId]/edit/page";

type PropertyDetailsPageProps = {
  property: editPropertyProps;
};

export default function PropertyDetailsPage({
  property,
}: PropertyDetailsPageProps) {
  return (
    <main className="min-h-screen  px-4 py-8  sm:px-6 lg:px-8 border">
      <h1>DashboardPropertyPreviewPage</h1>

      <article className="mx-auto max-w-6xl overflow-hidden rounded-sm border  shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-130">
            {property.images?.url ? (
              <img
                src={property.images.url}
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center ">
                No image available
              </div>
            )}
          </div>

          <section className="flex flex-col justify-center p-6 sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Property details
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-3 ">{property.location?.country}</p>
            <p className="mt-6 text-3xl font-bold ">{property.price}</p>

            <div className="mt-8 grid grid-cols-3 divide-x rounded-xl  py-4 text-center">
              <div>
                <strong className="block text-lg">
                  {property.bedrooms ?? "—"}
                </strong>
                <span className="text-sm text-slate-500">Bedrooms</span>
              </div>
              <div>
                <strong className="block text-lg">
                  {property.bathrooms ?? "—"}
                </strong>
                <span className="text-sm ">Bathrooms</span>
              </div>
              <div>
                <strong className="block text-lg">
                  {property.area ?? "—"}
                </strong>
                <span className="text-sm ">Area</span>
              </div>
            </div>

            {property.description && (
              <p className="mt-8 leading-7 ">{property.description}</p>
            )}

            <button
              type="button"
              //   onClick={onContact}
              className="mt-8 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Contact agent
            </button>
          </section>
        </div>
      </article>
    </main>
  );
}

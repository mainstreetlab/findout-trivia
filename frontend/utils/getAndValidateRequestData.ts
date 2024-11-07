import { ZodArray, ZodObject, ZodRawShape, ZodTypeAny, z } from "zod";

/**
 * Get and validate data provided in the request body of a backend route.
 *
 * @param req The Request object.
 * @param schema The Zod Schema to validate the data against.
 * @returns Promise resolving to the data if successful, or an error if not.
 */
export async function getAndValidateRequestData<
  T extends ZodObject<ZodRawShape>,
>(
  req: Request,
  requestSchema: T
): /* The following return type enables TypeScript to show data or error as defined,
by checking for an undefined value of the other property. */
Promise<
  { data: z.infer<T>; error: undefined } | { data: undefined; error: Error }
> {
  try {
    const data = await req.json();

    /* Validate the data with zod. Not using requestSchema.safeParse(),
    since request.json() could throw an error as well. */
    requestSchema.parse(data);

    return { data, error: undefined };
  } catch (error: any) {
    return { data: undefined, error };
  }
}

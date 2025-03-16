import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver";
import authResolver from "./auth.resolver";

const mergedResolvers = mergeResolvers([userResolver, authResolver]);

export default mergedResolvers;

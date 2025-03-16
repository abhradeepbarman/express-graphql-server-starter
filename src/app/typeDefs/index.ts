import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef";
import authTypeDef from "./auth.typeDef";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, authTypeDef]);

export default mergedTypeDefs;

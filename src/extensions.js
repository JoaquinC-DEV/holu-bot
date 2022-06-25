import profile from "./database/models/profile";

//To differentiate user errors
class StructureError extends Error {
    constructor(error) {
        super();
        this.name = "StructureError";
        this.message = error;
    }
}


export async function setDescription(user, description) {
    const userProfile = await profile.findOneAndUpdate({ user_id: user.id }, { profile_description: description });

    if (userProfile) {
        return true
    } else {
        return false
    }
};
import { CommentModel } from "../models/CommentModel.js";
import { UserModel } from "../models/UserModel.js";

export const saveComment = async (req,res) =>{
    try {
        const {comment, user_id, movie_id} = req.body;
        if (!(comment && user_id)) {
            return res.status(400).json({message:"Campos obligatorios"})
        }
        const userE = await UserModel.findOne({where : {id : user_id}});
        if (!userE){
            return res.status(404).json({message: "El usuario no ha sido encontrado"});
        }
        const newComment = await CommentModel.create({
            description: comment,
            user_id: user_id,
            movie_id: movie_id
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
export const getComments = async (req, res) => {
    try{
        const comments= await CommentModel.findAll(
        {
            where: {movie_id:req.params.id},
            include:[
                {
                    model: UserModel,
                    attributes: ['id', 'user', 'email'] // Specify the attributes you want to include from UserModel
                }
            ],
        }
        );
      
        return res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}
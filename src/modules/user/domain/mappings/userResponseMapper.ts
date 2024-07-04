import { UserRespondeDTO } from '../dtos/userReponse.dto';
import { UserInterface } from '../interfaces/user.interface';

export default class UserResponseMapper {
  static response = (data: UserInterface): UserRespondeDTO => {
    return new UserRespondeDTO(data.id, data.name, data.email);
  };
}

import memoize from 'lru-memoize';
import {createValidator, required, minLength} from 'utils/validation';

const loginValidation = createValidator({
  username: [required],
  password: [required, minLength(7)]
});

export default memoize(10)(loginValidation);

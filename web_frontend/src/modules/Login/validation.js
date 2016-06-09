import memoize from 'lru-memoize';
import {createValidator, required} from 'utils/validation';

const loginValidation = createValidator({
  username: [required],
  password: [required]
});

export default memoize(10)(loginValidation);

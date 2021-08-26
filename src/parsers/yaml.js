import yaml from 'js-yaml';

export function parse(raw) {
  return yaml.load(raw);
}

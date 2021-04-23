import { FoamWorkspace } from 'foam-core';
import { createTestNote } from '../test/test-utils';
import { isOrphan } from './orphans';

const orphanA = createTestNote({
  uri: '/path/orphan-a.md',
  title: 'Orphan A',
});

const nonOrphan1 = createTestNote({
  uri: '/path/non-orphan-1.md',
});

const nonOrphan2 = createTestNote({
  uri: '/path/non-orphan-2.md',
  links: [{ slug: 'non-orphan-1' }],
});

const workspace = new FoamWorkspace()
  .set(orphanA)
  .set(nonOrphan1)
  .set(nonOrphan2);
const graph = workspace.resolveLinks();

describe('isOrphan', () => {
  it('should return true when a note with no connections is provided', () => {
    expect(isOrphan(orphanA.uri, graph)).toBeTruthy();
  });
  it('should return false when a note with connections is provided', () => {
    expect(isOrphan(nonOrphan1.uri, graph)).toBeFalsy();
  });
});

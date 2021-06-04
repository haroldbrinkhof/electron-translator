import test from 'ava';
import { ProjectService } from '../../app/services/project.service';
import { Project } from '../../app/Project';

test('isProjectnameUnique: filenames must be unique among known projects - no projects yet - success - returns true', 
     t => t.is(new ProjectService().isProjectnameUnique("different"), true));

const KNOWN:string = 'known name';
const project:Project = new Project();
project.name = KNOWN;
const namesSet:ProjectService = new ProjectService();
namesSet.addProject(project);
test('isProjectnameUnique: filenames must be unique among known projects - other projects, name differs - success - returns true', 
     t => t.is(namesSet.isProjectnameUnique("different name"), true));

test('isProjectnameUnique: filenames must be unique among known projects - other projects, name identical - failure - returns false', 
     t => t.is(namesSet.isProjectnameUnique(KNOWN), false));

test('isProjectnameUnique: filenames must be unique among known projects - other projects, name null - failure - returns false', 
     t => t.is(namesSet.isProjectnameUnique(null), false));

test('isProjectnameUnique: filenames must be unique among known projects - other projects, name undefined - failure - returns false', 
     t => t.is(namesSet.isProjectnameUnique(undefined), false));

test('addProject:  project added, allProjects undefined - success - returns array containing all projects, size 1', 
     t => t.deepEqual(new ProjectService().addProject(project), [ project ]));

const allProjectsNull:ProjectService = new ProjectService();
test('addProject:  project added, _allProjects null - success - returns array containing all projects, size 1', 
     t => t.deepEqual(allProjectsNull.addProject(project), [ project ]));

test('addProject:  project added, _allProjects already has project with identical name - failure - returns undefined', 
     t => t.is(namesSet.addProject(project), undefined));

const anotherProject:Project = new Project();
anotherProject.name = 'another name';
test('addProject:  project added, allProjects already has project - success - returns array containing all projects, size 2', 
     t => t.deepEqual(namesSet.addProject(anotherProject), [ project, anotherProject ]));

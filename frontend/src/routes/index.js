import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';
import Dashboard from '~/pages/Dashboard';
import PlansList from '~/pages/Plans/List';
import PlansForm from '~/pages/Plans/Form';
import StudentsList from '~/pages/Students/List';
import StudentsForm from '~/pages/Students/Form';
import HelpOrdersList from '~/pages/HelpOrders';
import RegistrationsList from '~/pages/Registrations/List';
import RegistrationsForm from '~/pages/Registrations/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/students" component={StudentsList} isPrivate exact />
      <Route path="/students/create" component={StudentsForm} isPrivate />
      <Route path="/students/:id" component={StudentsForm} isPrivate />

      <Route path="/plans" component={PlansList} isPrivate exact />
      <Route path="/plans/create" component={PlansForm} isPrivate />
      <Route path="/plans/:id" component={PlansForm} isPrivate />

      <Route
        path="/registrations"
        component={RegistrationsList}
        isPrivate
        exact
      />
      <Route
        path="/registrations/create"
        component={RegistrationsForm}
        isPrivate
      />
      <Route
        path="/registrations/:id"
        component={RegistrationsForm}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrdersList} isPrivate exact />

      <Route path="/" component={() => <h1>Error 404</h1>} />
    </Switch>
  );
}

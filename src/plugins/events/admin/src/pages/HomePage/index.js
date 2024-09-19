/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import {
  Main,
  HeaderLayout,
  Combobox,
  ComboboxOption,
  ContentLayout,
} from "@strapi/design-system";

const HomePage = () => {
  return (
    <Main>
      <HeaderLayout
        title="Pasar lista"
        subtitle="Confirme la asitencia de los asistentes"
      />
      <ContentLayout>
        <Combobox
          label="Evento"
          hint="Seleccione un evento"
          placeholder="Nombre de mi conferencia"
        >
          <ComboboxOption value="sample1">Sample1</ComboboxOption>
          <ComboboxOption value="sample2">Sample2</ComboboxOption>
          <ComboboxOption value="sample3">Sample3</ComboboxOption>
        </Combobox>
      </ContentLayout>
    </Main>
  );
};

export default HomePage;

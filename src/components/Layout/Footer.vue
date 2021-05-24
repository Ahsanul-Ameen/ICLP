<template>
  <footer class="text-white bg-dark mt-5">
    <b-container fluid>
      <b-row>
        <b-col class="p-5">
          <b-table-simple borderless small caption-top responsive>
            <caption class="text-white">
              Find US
            </caption>
            <b-tbody class="text-white">
              <b-tr>
                <b-td class="font-weight-bold">PHONE</b-td>
                <b-td><a class="link-unstyled" href="tel:911">911</a></b-td>
              </b-tr>
              <b-tr>
                <b-td class="font-weight-bold">EMAIL</b-td>
                <b-td>
                  <a href="mailto:none@ugrad.cse.buet.ac.bd"
                    >none@ugrad.cse.buet.ac.bd
                  </a>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="font-weight-bold">ADDRESS</b-td>
                <b-td
                  >ECE Building, West Palashi Campus, BUET, Pilkhana Rd</b-td
                >
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>

        <b-col class="text-center text-bold">
          <b-table-simple borderless small responsive>
            <b-tbody class="text-white">
              <b-tr>
                <b-td
                  ><img
                    src="@/assets/iclp-logo-dark.png"
                    class="d-inline-block navbar-logo p-5"
                    alt="ICLP"
                    style="width: 300px"
                /></b-td>
              </b-tr>
              <b-tr>
                <b-td class="font-weight-bold"
                  >Copyright 2020-2020 by Data. All Rights Reserved.
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>

        <b-col align-self="center" class="text-center">
          FOLLOW ME ON
          <a href="https://facebook.com"><b-icon icon="facebook"></b-icon></a>
          <a href="https://github.com"><b-icon icon="github"></b-icon></a>
          <a href="https://instagram.com"><b-icon icon="instagram"></b-icon></a>
          <a href="https://linkedin.com"><b-icon icon="linkedin"></b-icon></a>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  &,
  &:visited,
  &:hover,
  &:active,
  &:focus,
  &:active:hover {
    font-style: inherit;
    color: inherit;
    background-color: transparent;
    font-size: inherit;
    text-decoration: none;
    font-variant: inherit;
    font-weight: inherit;
    line-height: inherit;
    font-family: inherit;
    border-radius: inherit;
    border: inherit;
    outline: inherit;
    box-shadow: inherit;
    padding: inherit;
    vertical-align: inherit;
  }
}
</style>

package psp.pos_system.dtos.business;

import psp.pos_system.models.Business;
import psp.pos_system.models.enums.ServiceType;

public class BusinessUpdateDTO {

    private String name;
    private String country;
    private String number;
    private String address;
    private ServiceType bussinesType;

    // Getters
    public String getName() { return name; }
    public String getCountry() { return country; }
    public String getNumber() { return number; }
    public String getAddress() { return address; }
    public ServiceType getBussinesType() { return bussinesType; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setCountry(String country) { this.country = country; }
    public void setNumber(String number) { this.number = number; }
    public void setAddress(String address) { this.address = address; }
    public void setBussinesType(ServiceType bussinesType) { this.bussinesType = bussinesType; }



}

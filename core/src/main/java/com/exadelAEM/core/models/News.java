package com.exadelAEM.core.models;

import lombok.Getter;
import lombok.Setter;


public class News {

    @Setter @Getter
    private String title;
    @Setter @Getter
    private String link;
    @Setter @Getter
    private String description;
    @Setter @Getter
    private String enclosure;
    @Setter @Getter
    private String pubDate;
    @Setter @Getter
    private String source;
    @Setter @Getter
    private String language;


    public News(String title, String link, String description, String pubDate, String enclosure, String source, String language) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.enclosure = enclosure;
        this.pubDate = pubDate;
        this.source = source;
        this.language = language;

    }



    @Override
    public String toString() {
        return "News [description=" + description
                + ", language=" + language + ", link=" + link + ", pubDate="
                + pubDate + ", title=" + title + ", enclosure=" + enclosure+ ", source=" + source+ "]";
    }


}
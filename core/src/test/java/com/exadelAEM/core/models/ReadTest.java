package com.exadelAEM.core.models;
import com.exadelAEM.core.service.RssNewsParser;
import org.junit.Test;

import java.util.List;


public class ReadTest {
    @Test
    public void test() {
        RssNewsParser parser = new RssNewsParser(
                "http://www.vogella.com/article.rss");
        List<News> feed = parser.readFeed();
        System.out.println(feed);
        for (News message : feed) {
            System.out.println(message);
        }

    }
}
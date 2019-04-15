import jieba
words = []  # 所有单词
two_words = [] # 大于或等于两个单词
with open("grimm.txt", 'rb') as f:
    for line in f.readlines():
        seg = line.decode('gbk').encode('utf-8')# 中文解编码
        seg1 = seg.strip()      
        seg_list = jieba.lcut(seg1, cut_all=False)# jieba分词
        words.extend(seg_list)  
print "此文章总共分得"+str(len(words))+"个词"
for i in words:  # 以词语长度分类
    if len(i) >= 2:
        words.remove(i)
        two_words.append(i)
print "此文章大于两个字的词语有" + str(len(two_words)) + "个"
print "此文章一个字的词语有" + str(len(words)) + "个"